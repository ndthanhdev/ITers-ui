import {Component, Input, Output, EventEmitter, OnChanges} from "@angular/core";

@Component({
  selector: 'app-topic-detail-input',
  template: `
  <div class="list-group-item flex-column align-items-start">
    <div class="input-group">
      <input type="text" class="form-control" placeholder="Add Topic Title" name="topicTitleInput" [(ngModel)]="topicTitleModel" aria-describedby="basic-addon1">
      <button type="button" class="btn btn-outline-success ml-2" 
        [disabled]="!topicTitleModel"
        (click)="onSaved()"><i class="fa fa-check" aria-hidden="true"></i><i class="fa fa-spinner fa-pulse fa-fw" *ngIf="creatingTopic"></i>
      </button>
      <button (click)="onCanceled()" *ngIf="isAdding" type="button" class="btn btn-outline-danger ml-2"><i class="fa fa-times" aria-hidden="true"></i></button>
      <button (click)="onDeleted()" *ngIf="isEditing" type="button" class="btn btn-outline-danger ml-2"><i class="fa fa-trash" aria-hidden="true"></i></button>
    </div>
  </div>
  `,
  styleUrls: ['topic-detail-input.component.scss']
})
export class TopicDetailInputComponent implements OnChanges {
  @Input() topicTitle: string;
  @Input() isAdding: boolean;
  @Input() isEditing: boolean;
  @Input() creatingTopic: boolean;

  @Output() saved = new EventEmitter();
  @Output() canceled = new EventEmitter();
  @Output() deleted = new EventEmitter();

  private topicTitleModel: string;

  ngOnChanges(): void {
    this.topicTitleModel = this.topicTitle;
  }

  constructor() {
  }

  private onSaved() {
    this.saved.emit(this.topicTitleModel);
  }

  private onCanceled() {
    this.canceled.emit();
  }

  private onDeleted() {
    this.deleted.emit();
  }

}
