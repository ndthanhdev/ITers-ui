import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../../shared/models/user.model";
import {UIAction} from "../../shared/store/actions/ui.action";
import {AppState} from "../../shared/store/reducers/app.reducer";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Params} from "@angular/router";
import {Account} from "../../shared/models/account.model";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss']
})
export class UserComponent implements OnInit {
  private user: User;
  private loadingUser: Observable<boolean>;
  private isEditingUser: boolean = false;
  private loggedInAccount: Account;
  private backUpUser: User;

  private datePickerModel: NgbDateStruct;
  private backUpDatePickerModel: NgbDateStruct;

  constructor(private uiAction: UIAction,
              private store: Store<AppState>,
              private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.store.dispatch(this.uiAction.startUserLoad(+params['id']));
    });
  }

  ngOnInit() {
    this.store.select(state => state.dataState.user).subscribe(user => {
      this.user = user;
      if (this.user && this.user.birthday)
        this.datePickerModel = {
          year: this.user.birthday.getFullYear(),
          month: this.user.birthday.getMonth() + 1,
          day: this.user.birthday.getDate()
        }
    });
    this.loadingUser = this.store.select(state => state.uiState.loadingUser);
    this.store.select(state => state.dataState.loggedInAccount).subscribe(account => this.loggedInAccount = account);
  }

  private onEditUserButtonClick() {
    this.isEditingUser = true;
    this.backUpUser = Object.assign({}, this.user);
    this.backUpDatePickerModel = Object.assign({}, this.datePickerModel);
  }

  private onUserFormSubmit() {
    if (this.datePickerModel)
      this.user.birthday = new Date(this.datePickerModel.year, this.datePickerModel.month - 1, this.datePickerModel.day + 1);
    this.store.dispatch(this.uiAction.startUserEdit(this.user));
  }

  private onCancelUserButtonClick() {
    this.isEditingUser = false;
    this.user = this.backUpUser;
    this.datePickerModel = this.backUpDatePickerModel;
  }

  private canShowEditUserButton(): boolean {
    if (!this.loggedInAccount)
      return false;
    else return this.loggedInAccount.user.id === this.user.id;
  }

}
