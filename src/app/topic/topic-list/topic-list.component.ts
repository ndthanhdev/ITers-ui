import {Component, OnInit, Inject} from "@angular/core";
import {PageScrollService, PageScrollInstance} from "ng2-page-scroll";
import {DOCUMENT} from "@angular/platform-browser";

@Component({
  selector: 'app-topic-list',
  template: `
  <app-list-header 
    [page]="currentPage"
    (pageChange)="onPageChange($event)" 
    (addClicked)="onAddTopicButtonClicked()">
  </app-list-header>
  <div class="list-group mb-3">
    <app-topic-detail-input
      *ngIf="isAdding"
      [isAdding]="isAdding"
      (saved)="onInputSaved()">
    </app-topic-detail-input>
    <app-topic-detail></app-topic-detail>
    <app-topic-detail></app-topic-detail>
    <app-topic-detail></app-topic-detail>
    <app-topic-detail></app-topic-detail>
    <app-topic-detail></app-topic-detail>
    <app-topic-detail></app-topic-detail>
    <app-topic-detail></app-topic-detail>
    <app-topic-detail></app-topic-detail>
    <app-topic-detail></app-topic-detail>
    <app-topic-detail></app-topic-detail>
    <app-topic-detail></app-topic-detail>
    <app-topic-detail></app-topic-detail>
    <app-topic-detail></app-topic-detail>
    <app-topic-detail></app-topic-detail>
  </div>
  <app-list-footer (scrollTopClicked)="onScrollTopClicked()" (pageChange)="onPageChange($event)" [page]="currentPage"></app-list-footer>
  `,
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {
  private currentPage: number = 1;
  private isAdding: boolean;

  constructor(private pageScrollService: PageScrollService,
              @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit() {
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

  private onScrollTopClicked() {
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#app-top');
    this.pageScrollService.start(pageScrollInstance);
  }
}
