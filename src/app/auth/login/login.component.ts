import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UIAction} from "../../shared/store/actions/ui.action";
import {AppState} from "../../shared/store/reducers/app.reducer";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private school_id_input: string;
  private password_input: string;
  private loggingIn: Observable<boolean>;

  constructor(private router: Router,
              private uiAction: UIAction,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.loggingIn = this.store.select(state => state.uiState.loggingIn);
    this.store.select(state => state.dataState.loggedInAccount).subscribe(account => {
      if (account) this.navigateToHome();
    });
  }

  private navigateToHome() {
    this.router.navigate(['/topics']);
  }

  private navigateToRegister() {
    this.router.navigate(['/register']);
  }

  private onSubmit() {
    this.store.dispatch(this.uiAction.startLogin(this.school_id_input, this.password_input));
  }

}
