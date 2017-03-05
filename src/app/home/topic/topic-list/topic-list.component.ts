import {Component, Input, Output, EventEmitter, OnChanges} from "@angular/core";
import {Topic} from "../../../shared/models/topic.model";
import {Account} from "../../../shared/models/account.model";
import {RoleEnum} from "../../../shared/models/role.model";

@Component({
  selector: 'app-topic-list',
  template: `
  <app-list-header 
    [page]="currentPage"
    [collectionSize]="topics.length"
    [canShowAddButton]="canShowAddButton()"
    (pageChange)="onPageChange($event)" 
    (addClicked)="onAddTopicButtonClicked()">
  </app-list-header>
  <div class="list-group mb-3">
    <app-topic-detail-input
      *ngIf="isAdding"
      [isAdding]="isAdding"
      [creatingTopic]="creatingTopic"
      (saved)="onInputSaved($event)"
      (canceled)="onInputCanceled()">
    </app-topic-detail-input>
    <template ngFor let-topic [ngForOf]="topics" let-i="index">
      <app-topic-detail
        *ngIf="i < (currentPage * 10) && i >= ((currentPage-1) * 10)"
        [topic]="topic"
        (topicEdited)="onTopicEdited($event)">
      </app-topic-detail>
    </template>
  </div>
  <app-list-footer
    [page]="currentPage"
    [collectionSize]="topics.length"
    (pageChange)="onPageChange($event)">
  </app-list-footer>
  `,
  styleUrls: ['topic-list.component.scss']
})
export class TopicListComponent implements OnChanges{
  @Input() topics: Topic[];
  @Input() loggedInAccount: Account;
  @Input() creatingTopic: boolean;

  @Output() topicSaved = new EventEmitter();
  @Output() topicEdited = new EventEmitter();
  private currentPage: number = 1;
  private isAdding: boolean;

  constructor() {
  }

  ngOnChanges(): void {
    this.isAdding = this.creatingTopic;
  }

  private onPageChange($event) {
    this.currentPage = $event;
  }

  private onAddTopicButtonClicked() {
    this.isAdding = true;
  }

  private onInputSaved($event) {
    this.topicSaved.emit($event);
    this.isAdding = false;
  }

  private onInputCanceled() {
    this.isAdding = false;
  }

  private onTopicEdited($event){
    this.topicEdited.emit($event);
  }

  private canShowAddButton(): boolean {
    if(!this.loggedInAccount)
      return false;
    return this.loggedInAccount.current_role.is(RoleEnum.ADMIN);
  }
}
