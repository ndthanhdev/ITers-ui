import {Component, OnInit} from "@angular/core";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  birthdayDatePickerModel;

  private maxDate: NgbDateStruct;

  private minDate: NgbDateStruct;

  constructor(private router: Router) {
    const currentDate = new Date();
    this.maxDate = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate()
    };
    this.minDate = {
      year: 1994,
      month: 1,
      day: 1
    }
  }

  ngOnInit() {
  }

  private navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
