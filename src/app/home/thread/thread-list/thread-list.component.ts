import {Component, OnInit, Input} from "@angular/core";
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
    <template ngFor let-thread [ngForOf]="threads" let-i="index">
      <app-thread-detail
        *ngIf="i < (currentPage * 10) && i >= ((currentPage - 1) * 10)"
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
export class ThreadListComponent implements OnInit {
  @Input() threads : Thread[];
  @Input() loggedInAccount : Account;

  private currentPage: number = 1;

  constructor() { }

  ngOnInit() {
  }

  private onPageChange($event) {
    this.currentPage = $event;
  }

  private onAddTopicButtonClicked() {
  }

  private canShowAddButton() : boolean{
    return this.loggedInAccount != null;
  }
}
