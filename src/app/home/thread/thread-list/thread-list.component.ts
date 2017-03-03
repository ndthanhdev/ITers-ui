import {Component, Input, Output, EventEmitter, OnChanges} from "@angular/core";
import {Thread} from "../../../shared/models/thread.model";
import {Account} from "../../../shared/models/account.model";

@Component({
  selector: 'app-thread-list',
  template: `
  <app-list-header 
    [page]="currentPage"
    [collectionSize]="threads.length"
    [canShowAddButton]="canShowAddButton()"
    (pageChange)="onPageChange($event)" 
    (addClicked)="onAddTopicButtonClicked()">
  </app-list-header>
  <div *ngIf="threads.length == 0" class="d-flex justify-content-center">
    <span class="lead">This topic doesn't have any thread right now. <a href="#">Create one</a></span>
  </div>
  <div class="list-group mb-3" *ngIf="threads.length > 0">
    <app-thread-detail-input
        *ngIf="isAdding"
        [creatingThread]="creatingThread"
        (saved)="onThreadSave($event)"
        (canceled)="onThreadCancel()">
    </app-thread-detail-input>
    <template ngFor let-thread [ngForOf]="threads" let-i="index">
      <app-thread-detail
        *ngIf="isIndexInCurrentPage(i)"
        [thread]="thread">
      </app-thread-detail>
    </template>
  </div>
  <app-list-footer
    [page]="currentPage"
    [collectionSize]="threads.length"
    (pageChange)="onPageChange($event)">
  </app-list-footer>
  `,
  styleUrls: ['./thread-list.component.scss']
})
export class ThreadListComponent implements OnChanges{
  @Input() threads: Thread[];
  @Input() loggedInAccount: Account;
  @Input() creatingThread: boolean;

  @Output() threadSaved = new EventEmitter();

  private currentPage: number = 1;
  private isAdding : boolean;

  constructor() {
  }

  ngOnChanges(): void {
    if(!this.creatingThread)
      this.isAdding = false;
  }

  private onPageChange($event) {
    this.currentPage = $event;
  }

  private canShowAddButton(): boolean {
    return this.loggedInAccount != null;
  }

  private onAddTopicButtonClicked() {
    this.isAdding = true;
  }

  private onThreadSave($event) {
    this.threadSaved.emit($event);
  }

  private onThreadCancel(){
    this.isAdding = false;
  }

  private isIndexInCurrentPage(index: number): boolean {
    return index < (this.currentPage * 10) && index >= ((this.currentPage - 1) * 10);
  }
}
