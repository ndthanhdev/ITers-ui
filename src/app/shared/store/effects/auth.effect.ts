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
import {Response} from "@angular/http";
import {NotificationsService} from "angular2-notifications";

@Injectable()
export class AuthServiceEffect {

  constructor(private actions: Actions,
              private dataAction: DataAction,
              private uiAction: UIAction,
              private authService: AuthService,
              private notificationService: NotificationsService) {
  }

  @Effect() login$: Observable<Action> = this.actions
    .ofType(UIAction.START_LOGIN)
    .map(action => action.payload)
    .switchMap(payload =>
      this.authService.login(payload.school_id, payload.password)
        .concatMap(account => {
            this.notificationService.success('SUCCESS!', 'Login successfully!');
            return Observable.from([
              this.dataAction.login(account),
              this.uiAction.endLogin()
            ])}
        )
        .catch((error: Response) => {
          let errMsg = this.getErrorMessage(error);
          this.notificationService.error('ERROR', errMsg);
          return Observable.from([
            this.uiAction.loginFailed(),
            this.uiAction.endLogin()
          ]);
        }));

  @Effect() register$: Observable<Action> = this.actions
    .ofType(UIAction.START_REGISTER)
    .map(action => action.payload)
    .switchMap(payload =>
      this.authService.register(payload.user, payload.account)
        .concatMap(msg => {
            this.notificationService.success('SUCCESS', msg);
            return Observable.from([
              this.dataAction.register(msg),
              this.uiAction.endRegister()
            ])
          })
        .catch((error: Response) => {
          let errMsg = this.getErrorMessage(error);
          this.notificationService.error('ERROR', errMsg);
          return Observable.from([
            this.uiAction.registerFailed(),
            this.uiAction.endRegister()
          ])
        }));

  //{msg : {email : ['error message']}}
  //TODO: get message value
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
