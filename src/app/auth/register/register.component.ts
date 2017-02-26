import {Component, OnInit} from "@angular/core";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {AppState} from "../../shared/store/reducers/app.reducer";
import {Store} from "@ngrx/store";
import {UIAction} from "../../shared/store/actions/ui.action";
import {Observable} from "rxjs";

@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private datePickerModel: NgbDateStruct;
  private currentDate: Date = new Date();
  private maxDate: NgbDateStruct = {
    year: this.currentDate.getFullYear(),
    month: this.currentDate.getMonth() + 1,
    day: this.currentDate.getDate()
  };
  private minDate: NgbDateStruct = {year: 1994, month: 1, day: 1};

  private user: {
    full_name?: string,
    email?: string,
    start_year?: number,
    birthday?: Date
  };

  private account: {
    school_id?: string,
    password?: string
  };

  private registering: Observable<boolean>;

  constructor(private router: Router,
              private store: Store<AppState>,
              private uiAction: UIAction) {
    this.user = [];
    this.account = [];
  }

  ngOnInit() {
    this.registering = this.store.select(state => state.uiState.registering);
  }

  private navigateToLogin() {
    this.router.navigate(['/login']);
  }

  private onSubmit() {
    this.user.birthday = new Date(this.datePickerModel.year, this.datePickerModel.month - 1, this.datePickerModel.day + 1);
    this.store.dispatch(this.uiAction.startRegister(this.user, this.account));
  }
}
