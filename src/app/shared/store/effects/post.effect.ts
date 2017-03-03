/**
 * Created by vunguyenhung on 2/27/17.
 */
import {Injectable} from "@angular/core";
import {PostService} from "../../../home/post/post.service";
import {UIAction} from "../actions/ui.action";
import {DataAction} from "../actions/data.action";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs";
import {Action, Store} from "@ngrx/store";
import {NotificationsService} from "angular2-notifications";
import {Response} from "@angular/http";
import {AppState} from "../reducers/app.reducer";
import {Account} from "../../models/account.model";
@Injectable()
export class PostServiceEffect {

  constructor(private actions: Actions,
              private dataAction: DataAction,
              private uiAction: UIAction,
              private postService: PostService,
              private notificationService: NotificationsService,
              private store: Store<AppState>) {
  }

  @Effect() postCreate$: Observable<Action> = this.actions
    .ofType(UIAction.START_POST_CREATE)
    .map(action => action.payload)
    .switchMap(payload =>
      this.postService.createPost(payload.topicId, payload.threadId, payload.postContent)
        .concatMap(responseMessage => {
          // this.notificationService.success('SUCCESS!', responseMessage.msg);
          return Observable.from([
            this.dataAction.createPost(responseMessage),
            this.uiAction.startPostAdd(responseMessage.link.url),
            this.uiAction.endPostCreate()
          ])
        })
    ).catch((error: Response) => {
      let errorMessage = this.getErrorMessage(error);
      this.notificationService.error('ERROR!', errorMessage);
      return Observable.from([
        this.uiAction.createPostFailed(),
        this.uiAction.endPostCreate()
      ])
    });

  @Effect() postEdit$: Observable<Action> = this.actions
    .ofType(UIAction.START_POST_EDIT)
    .map(action => action.payload)
    .switchMap(payload =>
      this.postService.editPost(payload.topicId, payload.threadId, payload.postId, payload.postContent)
        .concatMap(responseMessage => {
          // this.notificationService.success('SUCCESS!', responseMessage.msg);
          return Observable.from([
            this.dataAction.editPost(responseMessage),
            this.dataAction.addEditPost(payload.postId, payload.postContent)
          ])
        })
    );

  @Effect() postAdd$: Observable<Action> = this.actions
    .ofType(UIAction.START_POST_ADD)
    .map(action => action.payload)
    .switchMap(payload =>
      this.postService.loadPost(payload.url)
        .concatMap(post => {
          return Observable.from([this.dataAction.addPost(post)])
        }));

  @Effect() postVote$: Observable<Action> = this.actions
    .ofType(UIAction.START_POST_VOTE)
    .map(action => action.payload)
    .switchMap(payload =>
      this.postService.votePost(payload.postId, payload.liked)
        .concatMap(responseMessage => {
          let loggedInAccount: Account;
          this.store.select(state => state.dataState.loggedInAccount)
            .subscribe(account => loggedInAccount = account);
          // this.notificationService.success('SUCCESS!', responseMessage.msg); // TODO: can be removed
          return Observable.from([
            this.dataAction.addVotePost(payload.postId, payload.liked, loggedInAccount),
            this.dataAction.votePost(responseMessage)
          ])
        })
    );


  private getErrorMessage(error: Response) {
    const body = error.json().msg || '';
    if (typeof body == 'string')
      return body;

    let errorMessage: string = '';
    for (let invalidField in body)
      errorMessage += invalidField + ' is invalid!';

    console.error(errorMessage);
    return errorMessage;
  }
}
