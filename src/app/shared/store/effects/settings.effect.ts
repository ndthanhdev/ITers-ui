/**
 * Created by vunguyenhung on 3/7/17.
 */
import {Injectable} from "@angular/core";
import {UIAction} from "../actions/ui.action";
import {DataAction} from "../actions/data.action";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs";
import {SettingService} from "../../../dashboard/settings/setting.service";
import {Action} from "@ngrx/store";
@Injectable()
export class SettingServiceEffect {

  constructor(private actions: Actions,
              private dataAction: DataAction,
              private settingsService: SettingService) {
  }

  @Effect() settingsLoad$: Observable<Action> = this.actions
    .ofType(UIAction.START_SETTINGS_LOAD)
    .map(action => action.payload)
    .switchMap(payload => this.settingsService.loadSettings())
    .concatMap(settings => Observable.from([
      this.dataAction.loadSettings(settings)
    ]));


  @Effect() settingsEdit$: Observable<Action> = this.actions
    .ofType(UIAction.START_SETTINGS_EDIT)
    .map(action => action.payload)
    .switchMap(payload =>
      this.settingsService.editSettings(payload.settings)
        .concatMap(responseMessage => {
          return Observable.from([this.dataAction.editSettings(payload.settings)])
        }));

}
