import {Component, OnInit} from "@angular/core";
import {AppState} from "../../shared/store/reducers/app.reducer";
import {Store} from "@ngrx/store";
import {UIAction} from "../../shared/store/actions/ui.action";
import {Post} from "../../shared/models/post.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {Settings} from "../../shared/models/settings.model";
import {Thread} from "../../shared/models/thread.model";
import {User} from "../../shared/models/user.model";
import {Account} from "../../shared/models/account.model";

@Component({
  selector: 'app-dashboard',
  template: `
  <!--<div class="jumbotron mb-3">-->
    <!--<h1 class="display-4">Manage Content</h1>-->
  <!--</div>-->
  <!--<app-popular-threads-->
    <!--[popularThreads]="popularThreads | async"-->
    <!--[loadingPopularThread]="loadingPopularThreads | async">-->
  <!--</app-popular-threads>-->
  <!--<div class="row">-->
    <!--<div class="col-6">-->
      <!--<app-unconfirmed-posts -->
        <!--[unconfirmedPosts]="unconfirmedPosts | async"-->
        <!--[loadingUnconfirmedPosts]="loadingUnconfirmedPosts | async"-->
        <!--(postDetailButtonClicked)="onPostDetailButtonClick($event)"-->
        <!--(postConfirmButtonClicked)="onPostConfirmButtonClick($event)">-->
      <!--</app-unconfirmed-posts>-->
    <!--</div>-->
    <!--<div class="col-6">-->
      <!--<app-recent-posts-->
        <!--[recentPosts]="recentPosts | async"-->
        <!--[loadingRecentPosts]="loadingRecentPosts | async"-->
        <!--(postDetailButtonClicked)="onPostDetailButtonClick($event)">-->
      <!--</app-recent-posts>  -->
    <!--</div>-->
  <!--</div>-->
  <div class="jumbotron mb-3">
    <h1 class="display-4">Manage User</h1>
  </div>
  <!--<app-popular-users-->
    <!--[popularUsers]="popularUsers|async"-->
    <!--[loadingPopularUsers]="loadingPopularUsers | async">-->
  <!--</app-popular-users>-->
  <div class="row">
    <div class="col-6">
      <app-unconfirmed-accounts
        [unconfirmedAccounts]="unconfirmedAccounts | async"
        [loadingUnConfirmedAccounts]="loadingUnconfirmedAccounts | async"
        (accountDetailButtonClicked)="onAccountDetailButtonClick($event)"
        (accountConfirmButtonClicked)="onAccountConfirmButtonClick($event)">
      </app-unconfirmed-accounts>
    </div>
  </div>
  <!--<div class="jumbotron mb-3">-->
    <!--<h1 class="display-4">Settings</h1>-->
  <!--</div>-->
  <!--<app-settings-->
    <!--[settings]="settings | async"-->
    <!--(settingEdited)="onSettingEdit($event)">-->
  <!--</app-settings>-->
  `,
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private unconfirmedPosts: Observable<Post[]>;
  private recentPosts: Observable<Post[]>;
  private popularThreads: Observable<Thread[]>;

  private popularUsers: Observable<User[]>;
  private unconfirmedAccounts: Observable<Account[]>;

  private loadingUnconfirmedPosts: Observable<boolean>;
  private loadingRecentPosts: Observable<boolean>;
  private loadingPopularThreads: Observable<boolean>;

  private loadingPopularUsers: Observable<boolean>;
  private loadingUnconfirmedAccounts: Observable<boolean>;

  private settings: Observable<Settings>;

  constructor(private store: Store<AppState>,
              private uiAction: UIAction,
              private router: Router) {
    // this.store.dispatch(this.uiAction.startUnconfirmedPostsLoad());
    // this.store.dispatch(this.uiAction.startRecentPostsLoad());
    // this.store.dispatch(this.uiAction.startSettingsLoad());
    // this.store.dispatch(this.uiAction.startPopularThreadsLoad());
    // this.store.dispatch(this.uiAction.startPopularUsersLoad());
    this.store.dispatch(this.uiAction.startUnconfirmedAccountsLoad());
  }

  ngOnInit() {
    // this.unconfirmedPosts = this.store.select(state => state.dataState.unconfirmedPosts);
    // this.loadingUnconfirmedPosts = this.store.select(state => state.uiState.loadingUnconfirmedPosts);
    //
    // this.recentPosts = this.store.select(state => state.dataState.recentPosts);
    // this.loadingRecentPosts = this.store.select(state => state.uiState.loadingRecentPosts);
    //
    // this.popularThreads = this.store.select(state => state.dataState.popularThreads);
    // this.loadingPopularThreads = this.store.select(state => state.uiState.loadingPopularThreads);

    // this.popularUsers = this.store.select(state => state.dataState.popularUsers);
    // this.loadingPopularUsers = this.store.select(state => state.uiState.loadingPopularUsers);

    this.unconfirmedAccounts = this.store.select(state => state.dataState.unconfirmedAccounts);
    this.loadingUnconfirmedAccounts = this.store.select(state => state.uiState.loadingUnconfirmedAccounts);

    // this.settings = this.store.select(state => state.dataState.settings);
  }

  private onPostDetailButtonClick($event) {
    this.router.navigate(['/topics', $event.topicId, 'threads', $event.threadId]);
  }

  private onPostConfirmButtonClick($event) {
    this.store.dispatch(this.uiAction.startPostConfirm($event));
  }

  private onAccountDetailButtonClick($event){
    this.router.navigate(['users', $event.userId]);
  }

  private onAccountConfirmButtonClick($event){
    this.store.dispatch(this.uiAction.startAccountConfirmDashboard($event));
  }

  private onSettingEdit($event){
    this.store.dispatch(this.uiAction.startSettingsEdit({
      AUTO_USER_CONFIRMATION : $event.autoConfirmRegister,
      AUTO_POST_CONFIRMATION : $event.autoConfirmPost
    }))
  }
}
