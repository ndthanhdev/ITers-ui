/**
 * Created by vunguyenhung on 3/8/17.
 */
import {Injectable} from "@angular/core";
import {Effect, Actions} from "@ngrx/effects";
import {Observable} from "rxjs";
import {Action} from "@ngrx/store";
import {UIAction} from "../actions/ui.action";
import {AccountService} from "../../../user/account.service";
import {DataAction} from "../actions/data.action";
import {UserService} from "../../../user/user.service";
@Injectable()
export class AccountServiceEffect {

  constructor(private actions: Actions,
              private accountService: AccountService,
              private userService: UserService,
              private dataAction: DataAction,
              private uiAction: UIAction) {

  }

  @Effect() unconfirmedAccountsLoad$: Observable<Action> = this.actions
    .ofType(UIAction.START_UNCONFIRMED_ACCOUNTS_LOAD)
    .map(action => action.payload)
    .switchMap(payload => this.accountService.loadUnconfirmedAccounts())
    .concatMap(accounts => Observable.from([
      this.dataAction.loadUnconfirmedAccounts(accounts),
      this.uiAction.endUnconfirmedAccountsLoad()
    ]));

  // @Effect() recentUsersLoad$: Observable<Action> = this.actions
  //   .ofType(UIAction.START_RECENT_POSTS_LOAD)
  //   .map(action => action.payload)
  //   .switchMap(payload => this.postService.loadRecentPosts())
  //   .concatMap(posts => Observable.from([
  //     this.dataAction.loadRecentPosts(posts),
  //     this.uiAction.endRecentPostsLoad()
  //   ]));

  @Effect() accountConfirmDashboard$: Observable<Action> = this.actions
    .ofType(UIAction.START_ACCOUNT_CONFIRM_DASHBOARD)
    .map(action => action.payload)
    .switchMap(payload =>
      this.userService.confirmAccount(payload.userId)
        .concatMap(responseMessage =>
          Observable.from([this.dataAction.confirmAccountDashboard(payload.userId)])));
}
