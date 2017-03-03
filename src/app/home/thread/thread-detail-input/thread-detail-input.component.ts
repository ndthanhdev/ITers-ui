import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";

@Component({
  selector: 'app-thread-detail-input',
  template: `
  <div class="list-group-item">
    <div class="input-group">
      <input type="text" class="form-control mb-3" placeholder="Add Thread Title"  name="threadTitle" [(ngModel)]="threadTitle">
    </div>
    <div class="mb-3 w-100" [froalaEditor] [(froalaModel)]="postContent"></div>
    <div class="w-100 d-flex justify-content-end">
      <button class="btn btn-outline-danger ml-2" type="button" 
        (click)="onCancel()">Cancel</button>
      <button class="btn btn-outline-success ml-2" type="button" 
        (click)="onSave()"
        [disabled]="!postContent || !threadTitle">Save <i class="fa fa-spinner fa-pulse fa-fw" *ngIf="creatingThread"></i></button>
     </div>
  </div>
  `,
  styleUrls: ['./thread-detail-input.component.scss']
})
export class ThreadDetailInputComponent implements OnInit {
  @Input() creatingThread: boolean;

  @Output() saved = new EventEmitter();
  @Output() canceled = new EventEmitter();

  private threadTitle: string;
  private postContent: string;

  constructor() {
  }

  ngOnInit() {
  }

  // threadTitle, postContent
  private onSave() {
    this.saved.emit({
      threadTitle: this.threadTitle,
      postContent: this.postContent
    });
  }

  private onCancel() {
    this.canceled.emit();
  }

}
