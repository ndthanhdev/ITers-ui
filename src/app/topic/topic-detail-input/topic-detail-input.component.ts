import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";

@Component({
  selector: 'app-topic-detail-input',
  template: `
  <div class="list-group-item flex-column align-items-start">
    <div class="input-group">
      <input type="text" class="form-control" placeholder="Add Topic Title" [value]="topicTitle || ''" aria-describedby="basic-addon1">
      <button (click)="onSaved()" type="button" class="btn btn-outline-success ml-2"><i class="fa fa-check" aria-hidden="true"></i>
      </button>
      <button (click)="onCanceled()" *ngIf="isAdding" type="button" class="btn btn-outline-danger ml-2"><i class="fa fa-times" aria-hidden="true"></i></button>
      <button (click)="onDeleted()" *ngIf="isEditing" type="button" class="btn btn-outline-danger ml-2">Delete</button>
    </div>
  </div>
  `,
  styleUrls: ['./topic-detail-input.component.scss']
})
export class TopicDetailInputComponent implements OnInit {
  @Input() topicTitle: string;
  @Input() isAdding: boolean;
  @Input() isEditing: boolean;

  @Output() saved = new EventEmitter();
  @Output() canceled = new EventEmitter();
  @Output() deleted = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  private onSaved() {
    this.saved.emit();
  }

  private onCanceled() {
    this.canceled.emit();
  }

  private onDeleted() {
    this.deleted.emit();
  }

}
