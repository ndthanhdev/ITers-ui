import {Component} from "@angular/core";
import {Router} from "@angular/router";
import "rxjs/add/operator/map";
import {PageScrollConfig} from "ng2-page-scroll";
import {AppState} from "./shared/store/reducers/app.reducer";
import {Store} from "@ngrx/store";
import {DataAction} from "./shared/store/actions/data.action";
import {JwtHelper} from "angular2-jwt";
import {Account} from "./shared/models/account.model";

@Component({
  selector: 'app-root',
  template: `
  <div id="app-top"></div>
  <app-navbar *ngIf="isLoginOrRegisterRoute()"></app-navbar>
  <div class="container" >
    <router-outlet></router-outlet>
  </div>
  <app-footer></app-footer>
  <simple-notifications [options]="notificationOptions"></simple-notifications>
  `,
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  private notificationOptions = {
    position: ["bottom", "right"],
    timeOut: 2000,
    showProgressBar: false,
    preventDuplicates : true
  };

  constructor(private router: Router,
              private store: Store<AppState>,
              private dataAction: DataAction) {
    PageScrollConfig.defaultDuration = 350;

    //TODO: refactor this
    let jwtHelper: JwtHelper = new JwtHelper();
    let jwtToken = localStorage.getItem('id_token');
    if (jwtToken) {
      if (jwtHelper.isTokenExpired(jwtToken))
        this.goToDash();
      else
        this.store.dispatch(this.dataAction.login(new Account(jwtHelper.decodeToken(jwtToken))))
    } else this.goToDash();

  }

  private isLoginOrRegisterRoute(): boolean {
    return this.router.routerState.snapshot.url != '/login' &&
      this.router.routerState.snapshot.url != '/register'
  }


  private goToDash() {
    this.router.navigate(['/']);
  }

  private goToHome() {
    this.router.navigate(['/topics']);
  }
}
