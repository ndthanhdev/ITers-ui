/**
 * Created by vunguyenhung on 2/25/17.
 */
import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {DataAction} from "../actions/data.action";
import {UIAction} from "../actions/ui.action";
import {AuthService} from "../../../auth/auth.service";
import {Observable} from "rxjs";
import {Action} from "@ngrx/store";

@Injectable()
export class AuthServiceEffect {

  constructor(private actions: Actions,
              private dataAction: DataAction,
              private uiAction: UIAction,
              private authService: AuthService) {
  }

  @Effect() login$: Observable<Action> = this.actions
    .ofType(UIAction.START_LOGIN)
    .map(action => action.payload)
    .switchMap(payload => this.authService.login(payload.school_id, payload.password))
    .concatMap(account => Observable.from([
      this.dataAction.login(account),
      this.uiAction.endLogin()
    ]));


  @Effect() register$: Observable<Action> = this.actions
    .ofType(UIAction.START_REGISTER)
    .map(action => action.payload)
    .switchMap(payload => this.authService.register(payload.user, payload.account))
    .concatMap(msg => Observable.from([
      this.dataAction.register(msg),
      this.uiAction.endRegister()
      // TODO: start login
    ]))
}
