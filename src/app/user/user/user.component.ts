import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../../shared/models/user.model";
import {UIAction} from "../../shared/store/actions/ui.action";
import {AppState} from "../../shared/store/reducers/app.reducer";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss']
})
export class UserComponent implements OnInit {
  private user: User;
  private loadingUser: Observable<boolean>;

  constructor(private uiAction: UIAction,
              private store: Store<AppState>,
              private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.store.dispatch(this.uiAction.startUserLoad(+params['id']));
    });
  }

  ngOnInit() {
    this.store.select(state => state.dataState.user).subscribe(user => this.user = user);
    this.loadingUser = this.store.select(state => state.uiState.loadingUser);
  }

}
