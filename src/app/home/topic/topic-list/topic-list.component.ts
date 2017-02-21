import {Component, Inject, Input} from "@angular/core";
import {PageScrollService, PageScrollInstance} from "ng2-page-scroll";
import {DOCUMENT} from "@angular/platform-browser";
import {Topic} from "../../../shared/models/topic.model";

@Component({
  selector: 'app-topic-list',
  template: `
  <app-list-header 
    [page]="currentPage"
    [collectionSize]="topics.length"
    (pageChange)="onPageChange($event)" 
    (addClicked)="onAddTopicButtonClicked()">
  </app-list-header>
  <div class="list-group mb-3">
    <app-topic-detail-input
      *ngIf="isAdding"
      [isAdding]="isAdding"
      (saved)="onInputSaved()"
      (canceled)="onInputCanceled()">
    </app-topic-detail-input>
      
    <template ngFor let-topic [ngForOf]="topics" let-i="index">
      <app-topic-detail
        *ngIf="i < (currentPage * 10) && i >= ((currentPage-1) * 10)"
        [topic]="topic">
      </app-topic-detail>
    </template>
    
  </div>
  <app-list-footer
    [page]="currentPage"
    [collectionSize]="topics.length"
    (scrollTopClicked)="onScrollTopClicked()" 
    (pageChange)="onPageChange($event)">
  </app-list-footer>
  `,
  styleUrls: ['topic-list.component.scss']
})
export class TopicListComponent {
  @Input() topics: Topic[];

  private currentPage: number = 1;
  private isAdding: boolean;

  constructor(private pageScrollService: PageScrollService,
              @Inject(DOCUMENT) private document: any) {
  }

  private onPageChange($event) {
    this.currentPage = $event;
  }

  private onAddTopicButtonClicked() {
    this.isAdding = true;
  }

  private onInputSaved() {
    this.isAdding = false;
  }

  private onInputCanceled() {
    this.isAdding = false;
  }

  private onScrollTopClicked() {
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#app-top');
    this.pageScrollService.start(pageScrollInstance);
  }
}
