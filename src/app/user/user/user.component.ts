import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../../shared/models/user.model";
import {UIAction} from "../../shared/store/actions/ui.action";
import {AppState} from "../../shared/store/reducers/app.reducer";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Account} from "../../shared/models/account.model";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {RoleEnum} from "../../shared/models/role.model";
import {IMultiSelectOption, IMultiSelectSettings} from "angular-2-dropdown-multiselect";
import {Topic} from "../../shared/models/topic.model";

//TODO: refactor this
@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss']
})
export class UserComponent implements OnInit {
  private user: User;
  private loadingUser: Observable<boolean>;
  private syncingUserTopic: boolean = true;
  private isEditingUser: boolean = false;
  private isEditingRole: boolean = false;
  private loggedInAccount: Account;
  private backUpUser: User;
  private topics: Topic[];

  private datePickerModel: NgbDateStruct;
  private backUpDatePickerModel: NgbDateStruct;

  private roleModel: string;
  private roleModelBackup: string;
  private roles: string[] = ['User', 'Mod', 'Admin'];

  private optionsModel: number[] = [];
  private topicPickerOptions: IMultiSelectOption[] = [];
  private topicPickerOptionsBackup: IMultiSelectOption[];
  private topicPickerSetting: IMultiSelectSettings = {
    enableSearch: true
  };

  onChange() {
    console.log(this.optionsModel);
  }

  constructor(private uiAction: UIAction,
              private store: Store<AppState>,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.store.dispatch(this.uiAction.startUserLoad(+params['id']));
    });
  }

  ngOnInit() {
    this.store.select(state => state.dataState.user).subscribe(user => {
      this.user = user;
      if (this.user) {
        this.initDatePickerModel(this.user);
        this.initOptionsModel(this.user);
        this.initRoleModel(this.user);
      }
    });
    this.loadingUser = this.store.select(state => state.uiState.loadingUser);
    this.store.select(state => state.uiState.syncingUserTopic).subscribe(syncingUserTopic => this.syncingUserTopic = syncingUserTopic);
    this.store.select(state => state.dataState.loggedInAccount).subscribe(account => this.loggedInAccount = account);
    this.store.select(state => state.dataState.topics).subscribe(topics => {
      this.topics = topics;
      this.initTopicPickerOptions(this.topics);
    });
    if (this.topics.length <= 0)
      this.store.dispatch(this.uiAction.startTopicsLoad());
  }

  private initTopicPickerOptions(topics: Topic[]) {
    if (topics.length > 0 && this.topicPickerOptions.length <= 0)
      this.topics.forEach(topic => this.topicPickerOptions.push({id: topic.id, name: topic.title}));
  }

  private initRoleModel(user: User) {
    if (user.account)
      this.roleModel = this.user.account.current_role.role();
  }

  private initOptionsModel(user: User) {
    if (user.topics) {
      this.optionsModel = [];
      this.user.topics.forEach((topic) => this.optionsModel.push(topic.id));
    }
  }

  private initDatePickerModel(user: User) {
    if (user.birthday)
      this.datePickerModel = {
        year: this.user.birthday.getFullYear(),
        month: this.user.birthday.getMonth() + 1,
        day: this.user.birthday.getDate()
      };
  }

  private onEditUserButtonClick() {
    this.isEditingUser = true;
    this.backUpUser = Object.assign({}, this.user);
    this.backUpDatePickerModel = Object.assign({}, this.datePickerModel);
  }

  private onEditRoleButtonClick() {
    this.roleModelBackup = this.roleModel;
    this.topicPickerOptionsBackup = Object.assign([], this.topicPickerOptions);
    this.isEditingRole = true;
  }

  private onUserFormSubmit() {
    if (this.datePickerModel)
      this.user.birthday = new Date(this.datePickerModel.year, this.datePickerModel.month - 1, this.datePickerModel.day + 1);
    this.store.dispatch(this.uiAction.startUserEdit(this.user));
    this.isEditingUser = false;
  }

  private onRoleFormSubmit() {
    if (this.roleModel !== this.roleModelBackup || this.roleModel == 'Mod'){
      if(this.roleModel == 'User')
        this.optionsModel = [];
      this.store.dispatch(this.uiAction.startRoleUpdate(this.user.id, this.roleToNumber(this.roleModel), this.optionsModel));
    }

    this.isEditingRole = false;
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

  private canShowEditRoleButton(): boolean {
    if (!this.loggedInAccount)
      return false;
    else return this.loggedInAccount.current_role.is(RoleEnum.ADMIN);
  }

  private onCancelEditRoleButtonClick() {
    this.isEditingRole = false;
    this.topicPickerOptions = this.topicPickerOptionsBackup;
    this.roleModel = this.roleModelBackup;
  }

  private findTopicName(topicId: number): string {
    if (this.optionsModel.length > 0 && this.topicPickerOptions.length > 0 && topicId)
      return this.topicPickerOptions.find(option => option.id === topicId).name;
  }

  private navigateToTopic(id: number) {
    this.router.navigate(['topics', id]);
  }

  private roleToNumber(role: string): number {
    switch (role) {
      case 'User':
        return 1;
      case 'Mod':
        return 2;
      case 'Admin':
        return 3
    }
  }
}
