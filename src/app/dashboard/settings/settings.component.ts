import {Component, OnInit, Output, EventEmitter, Input, OnChanges} from "@angular/core";
import {Settings} from "../../shared/models/settings.model";

@Component({
  selector: 'app-settings',
  template: `
  <div class="card mb-3">
    <div class="card-header">
      <span class="lead">Automation</span>
       <button *ngIf="isEditing" (click)="onCancelEditButtonClick()" type="button" class="btn btn-outline-danger btn-sm mr-1">Cancel</button>
        <button *ngIf="isEditing"  type="button" class="btn btn-outline-success btn-sm mr-1"
                (click)="onSubmit()"
                [disabled]="syncingUserTopic">Save</button>
        <button *ngIf="!isEditing" (click)="onEditButtonClick()" type="button"
                class="btn btn-outline-primary btn-sm"><span class="fa fa-pencil"></span></button>
        <i *ngIf="syncingUserTopic" class="fa fa-spinner fa-pulse fa-fw"></i>
    </div>
    <div class="card-block">
      <div class="row d-flex justify-content-center">
        <div class="col-6 d-flex justify-content-center align-items-center">
          <span class="mr-3">Automatically confirm on new registration:</span>
          <div [(ngModel)]="autoConfirmRegister" ngbRadioGroup name="autoConfirmRegister">
            <label class="btn btn-outline-primary">
              <input type="radio" [value]="true" [disabled]="!isEditing && !autoConfirmRegister"> On
            </label>
            <label class="btn btn-outline-primary">
              <input type="radio" [value]="false" [disabled]="!isEditing && autoConfirmRegister"> Off
            </label>
          </div>
        </div>
        <div class="col-6 d-flex justify-content-center align-items-center">
          <span class="mr-3">Automatically confirm on new post:</span>
          <div [(ngModel)]="autoConfirmPost" ngbRadioGroup name="autoConfirmPost">
            <label class="btn btn-outline-primary">
              <input type="radio" [value]="true" [disabled]="!isEditing && !autoConfirmPost"> On
            </label>
            <label class="btn btn-outline-primary">
              <input type="radio" [value]="false" [disabled]="!isEditing && autoConfirmPost"> Off
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnChanges {

  @Input() settings: Settings;
  @Output() settingEdited = new EventEmitter();

  private isEditing: boolean = false;
  private autoConfirmRegister: boolean = false;
  private autoConfirmPost: boolean = false;
  private autoConfirmRegisterBackup: boolean;
  private autoConfirmPostBackup: boolean;

  constructor() {
  }

  ngOnChanges(): void {
    if (this.settings) {
      this.autoConfirmRegister = this.settings.AUTO_USER_CONFIRMATION;
      this.autoConfirmPost = this.settings.AUTO_POST_CONFIRMATION;
    }
  }

  ngOnInit() {

  }

  private onCancelEditButtonClick() {
    this.isEditing = false;
    this.autoConfirmRegister = this.autoConfirmRegisterBackup;
    this.autoConfirmPost = this.autoConfirmPostBackup;
  }

  private onSubmit() {
    this.isEditing = false;
    this.settingEdited.emit({
      autoConfirmRegister: this.autoConfirmRegister,
      autoConfirmPost: this.autoConfirmPost
    });
  }

  private onEditButtonClick() {
    this.isEditing = true;
    this.autoConfirmRegisterBackup = this.autoConfirmRegister;
    this.autoConfirmPostBackup = this.autoConfirmPost;
  }
}
