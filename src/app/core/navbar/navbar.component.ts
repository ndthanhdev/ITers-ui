import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Account} from "../../shared/models/account.model";
import {AppState} from "../../shared/store/reducers/app.reducer";
import {Store} from "@ngrx/store";
import {DataAction} from "../../shared/store/actions/data.action";
import {RoleEnum} from "../../shared/models/role.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private loggedInAccount: Account;

  constructor(private router: Router,
              private store: Store<AppState>,
              private dataAction: DataAction) {
  }

  ngOnInit() {
    this.store.select(state => state.dataState.loggedInAccount)
      .subscribe(loggedInAccount => this.loggedInAccount = loggedInAccount);
  }

  private goToHome() {
    this.router.navigate(['/topics']);
  }

  private goToDash() {
    this.router.navigate(['/']);
  }

  private goToDashboard(){
    this.router.navigate(['/dashboard']);
  }

  private goToUser(id: number) {
    this.router.navigate(['/users', id]);
  }

  private logout() {
    localStorage.clear();
    this.store.dispatch(this.dataAction.logout());
    this.goToDash();
  }

  private canShowDashBoardIcon(): boolean{
    if (!this.loggedInAccount)
      return false;
    else return !this.loggedInAccount.current_role.is(RoleEnum.USER);
  }
}
