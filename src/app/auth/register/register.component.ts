import {Component, OnInit} from "@angular/core";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-register',
  template: `
  <div class="aligner">
    <div class="card w-25">
      <div class="card-header text-center">
        <h2>Register</h2>
      </div>
      <div class="card-block">
        <form>
  
          <!--START USER INFORMATION-->
          <h3 class="mb-1">User Information</h3>
          <hr class="mt-0">
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-user" aria-hidden="true"></i></span>
              <input type="text" class="form-control" aria-describedby="school-id" placeholder="Full Name*">
              <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> VALIDATION-->
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-envelope-square" aria-hidden="true"></i></span>
              <input type="email" class="form-control" placeholder="Email*">
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-book" aria-hidden="true"></i></span>
              <input type="number" class="form-control" placeholder="Start Year">
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-calendar" aria-hidden="true" (click)="d.toggle()"></i></span>
              <input class="form-control" placeholder="Birthday (yyyy-mm-dd)" 
                name="dp" [(ngModel)]="birthdayDatePickerModel" ngbDatepicker #d="ngbDatepicker"
                [maxDate]="maxDate"
                [minDate]="minDate">
              <!--<input type="datetime" class="form-control" placeholder="Birthday (yyyy-mm-dd)">-->
            </div>
          </div>
          <!--END USER INFORMATION-->
  
  
          <!--START ACCOUNT INFORMATION-->
          <h3 class="mb-1">Account Information</h3>
          <hr class="mt-0">
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon">
                  <i class="fa fa-id-badge" aria-hidden="true"></i>
              </span>
              <input type="text" class="form-control" aria-describedby="school-id" placeholder="School ID*">
              <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> VALIDATION-->
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon">
                  <i class="fa fa-lock" aria-hidden="true"></i>
              </span>
              <input type="password" class="form-control" placeholder="Password*">
            </div>
          </div>
          <!--END ACCOUNT INFORMATION-->
  
          <!--START ROLE INFORMATION-->
          <h3 class="mb-1">Role Information</h3>
          <hr class="mt-0">
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-key" aria-hidden="true"></i></span>
              <input type="text" class="form-control" aria-describedby="school-id" value="User" readonly>
              <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> VALIDATION-->
            </div>
          </div>
          <!--END ROLE INFORMATION-->
  
  
        </form>
      </div>
      <div class="card-footer d-flex justify-content-end">
        <button type="button" class="btn btn-link">Clear</button>
        <button type="button" class="btn btn-primary">Register</button>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  birthdayDatePickerModel;

  private maxDate: NgbDateStruct;

  private minDate: NgbDateStruct;

  constructor() {
    let currentDate = new Date();
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

}
