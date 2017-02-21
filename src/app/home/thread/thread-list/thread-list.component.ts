import {Component, OnInit, Inject, Input} from "@angular/core";
import {PageScrollService, PageScrollInstance} from "ng2-page-scroll";
import {DOCUMENT} from "@angular/platform-browser";
import {Thread} from "../../../shared/models/thread.model";

@Component({
  selector: 'app-thread-list',
  template: `
  <app-list-header 
    [page]="currentPage"
    [collectionSize]="threads.length"
    (pageChange)="onPageChange($event)" 
    (addClicked)="onAddTopicButtonClicked()">
  </app-list-header>
  <div class="list-group mb-3">
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
    (scrollTopClicked)="onScrollTopClicked()" 
    (pageChange)="onPageChange($event)">
  </app-list-footer>
  `,
  styleUrls: ['./thread-list.component.scss']
})
export class ThreadListComponent implements OnInit {
  @Input() threads : Thread[];

  private currentPage: number = 1;

  constructor(private pageScrollService: PageScrollService,
              @Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
  }

  private onPageChange($event) {
    this.currentPage = $event;
  }

  private onAddTopicButtonClicked() {
  }

  private onScrollTopClicked() {
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#app-top');
    this.pageScrollService.start(pageScrollInstance);
  }
}
