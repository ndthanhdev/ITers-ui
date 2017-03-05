/**
 * Created by vunguyenhung on 2/25/17.
 */
import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {DataAction} from "../actions/data.action";
import {UIAction} from "../actions/ui.action";
import {UserService} from "../../../user/user.service";
import {Observable} from "rxjs";
import {Action} from "@ngrx/store";

@Injectable()
export class UserServiceEffect {
  constructor(private actions: Actions,
              private dataAction: DataAction,
              private uiAction: UIAction,
              private userService: UserService) {
  }

  @Effect() userLoad$: Observable<Action> = this.actions
    .ofType(UIAction.START_USER_LOAD)
    .map(action => action.payload)
    .switchMap(payload => this.userService.loadUser(payload.id))
    .concatMap(user => Observable.from([
      this.dataAction.loadUser(user),
      this.uiAction.endUserLoad()
    ]));

  @Effect() userEdit$: Observable<Action> = this.actions
    .ofType(UIAction.START_USER_EDIT)
    .map(action => action.payload)
    .switchMap(payload => this.userService.editUser(payload.user)
      .concatMap(responseMessage => Observable.from([
        this.dataAction.editUser(responseMessage),
        this.dataAction.addEditUser(payload.user)
      ])));


  @Effect() updateRole$: Observable<Action> = this.actions
    .ofType(UIAction.START_ROLE_UPDATE)
    .map(action => action.payload)
    .switchMap(payload => this.userService.updateRole(payload.userId, payload.privilege_level)
      .concatMap(responseMessage => Observable.from([
        this.dataAction.updateRole(payload.privilege_level),
        this.uiAction.startUserTopicSync(payload.userId, payload.topics)
      ])));


  @Effect() syncUserTopic$: Observable<Action> = this.actions
    .ofType(UIAction.START_USER_TOPIC_SYNC)
    .map(action => action.payload)
    .switchMap(payload => this.userService.syncUserTopic(payload.userId, payload.topics)
      .concatMap(responseMessage => Observable.from([
        this.dataAction.syncUserTopic(payload.topics),
        this.uiAction.endUserTopicSync()
      ])));
}
