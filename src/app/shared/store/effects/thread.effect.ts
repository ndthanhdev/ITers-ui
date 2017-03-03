/**
 * Created by vunguyenhung on 2/23/17.
 */
import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {DataAction} from "../actions/data.action";
import {UIAction} from "../actions/ui.action";
import {ThreadService} from "../../../home/thread/thread.service";
import {Observable} from "rxjs";
import {Action, Store} from "@ngrx/store";
import {AppState} from "../reducers/app.reducer";
import {Response} from "@angular/http";
import {NotificationsService} from "angular2-notifications";
@Injectable()
export class ThreadServiceEffect {

  constructor(private actions: Actions,
              private dataAction: DataAction,
              private uiAction: UIAction,
              private store: Store<AppState>,
              private threadService: ThreadService,
  private notificationService: NotificationsService) {
  }

  @Effect() threadLoad$: Observable<Action> = this.actions
    .ofType(UIAction.START_THREAD_LOAD)
    .map(action => action.payload)
    .switchMap(payload => this.threadService.loadThread(payload.topicId, payload.threadId))
    .concatMap(thread => Observable.from([
      this.dataAction.loadThread(thread),
      this.uiAction.endThreadLoad()
    ]));


  @Effect() threadCreate$: Observable<Action> = this.actions
    .ofType(UIAction.START_THREAD_CREATE)
    .map(action => action.payload)
    .switchMap(payload =>
      this.threadService.createThread(payload.threadTitle, payload.topicId)
        .concatMap(responseMessage => {
          let regex = /topics\/(\d+)\/threads\/(\d+)/;
          let params = regex.exec(responseMessage.link.url);
          let topicId = +params[1];
          let threadId = +params[2];
          return Observable.from([
            this.dataAction.createThread(responseMessage),
            this.uiAction.startPostCreate(topicId, threadId, payload.postContent),
            this.uiAction.startThreadAdd(topicId, threadId),
            this.uiAction.endThreadCreate()
          ])
        })
    ).catch((error: Response) => {
      let errorMessage = this.getErrorMessage(error);
      this.notificationService.error('ERROR!', errorMessage);
      return Observable.from([
        this.uiAction.createThreadFailed(),
        this.uiAction.endThreadCreate()
      ])
    });

  @Effect() threadAdd$: Observable<Action> = this.actions
    .ofType(UIAction.START_THREAD_ADD)
    .map(action => action.payload)
    .switchMap(payload =>
      this.threadService.loadThread(payload.topicId, payload.threadId)
        .concatMap(thread => {
          let loggedInAccount;
          this.store.select(state => state.dataState.loggedInAccount).subscribe(account => loggedInAccount = account);
          return Observable.from([
            this.dataAction.addThread(thread, loggedInAccount)
          ])
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
