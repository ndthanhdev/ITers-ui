/**
 * Created by vunguyenhung on 2/23/17.
 */
import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {DataAction} from "../actions/data.action";
import {UIAction} from "../actions/ui.action";
import {ThreadService} from "../../../home/thread/thread.service";
import {Observable} from "rxjs";
import {Action} from "@ngrx/store";
@Injectable()
export class ThreadServiceEffect{

  constructor(private actions: Actions,
              private dataAction: DataAction,
              private uiAction: UIAction,
              private threadService: ThreadService) {
  }

  @Effect() threadLoad$: Observable<Action> = this.actions
    .ofType(UIAction.START_THREAD_LOAD)
    .map(action => action.payload)
    .switchMap(payload => this.threadService.loadThread(payload.topicId,payload.threadId))
    .concatMap(thread => Observable.from([
      this.dataAction.loadThread(thread),
      this.uiAction.endThreadLoad()
    ]));
}
