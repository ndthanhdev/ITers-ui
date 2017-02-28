/**
 * Created by vunguyenhung on 2/27/17.
 */
import {Injectable} from "@angular/core";
import {PostService} from "../../../home/post/post.service";
import {UIAction} from "../actions/ui.action";
import {DataAction} from "../actions/data.action";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs";
import {Action} from "@ngrx/store";
import {NotificationsService} from "angular2-notifications";
import {Response} from "@angular/http";
@Injectable()
export class PostServiceEffect {

  constructor(private actions: Actions,
              private dataAction: DataAction,
              private uiAction: UIAction,
              private postService: PostService,
              private notificationService: NotificationsService) {
  }

  @Effect() postCreate$: Observable<Action> = this.actions
    .ofType(UIAction.START_POST_CREATE)
    .map(action => action.payload)
    .switchMap(payload =>
      this.postService.createPost(payload.topicId, payload.threadId, payload.postContent)
        .concatMap(responseMessage => {
          this.notificationService.success('SUCCESS!', responseMessage.msg);
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

  @Effect() postAdd$: Observable<Action> = this.actions
    .ofType(UIAction.START_POST_ADD)
    .map(action => action.payload)
    .switchMap(payload =>
      this.postService.loadPost(payload.url)
        .concatMap(post => {
          return Observable.from([this.dataAction.addPost(post)])
        }));

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
