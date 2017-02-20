import {Component, OnInit, Inject} from "@angular/core";
import {PageScrollService, PageScrollInstance} from "ng2-page-scroll";
import {DOCUMENT} from "@angular/platform-browser";
import {UIAction} from "../../shared/store/actions/ui.action";
import {Store} from "@ngrx/store";
import {AppState} from "../../shared/store/reducers/app.reducer";
import {Topic} from "../../shared/models/topic.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-topic-list',
  template: `
  <div class="d-flex justify-content-center">
    <i *ngIf="loadingTopic | async" class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
  </div>
  <app-list-header 
    *ngIf="!(loadingTopic | async)"
    [page]="currentPage"
    [collectionSize]="(topics | async).length"
    (pageChange)="onPageChange($event)" 
    (addClicked)="onAddTopicButtonClicked()">
  </app-list-header>
  <div class="list-group mb-3" *ngIf="!(loadingTopic | async)">
    <app-topic-detail-input
      *ngIf="isAdding"
      [isAdding]="isAdding"
      (saved)="onInputSaved()">
    </app-topic-detail-input>
    <!--*ngFor="let topic of (topics | async);let i = index"-->
      
    <template ngFor let-topic [ngForOf]="topics | async" let-i="index">
      <app-topic-detail
        *ngIf="i < (currentPage * 10) && i >= ((currentPage-1) * 10)"
        [topic]="topic">
      </app-topic-detail>
    </template>
    
  </div>
  <app-list-footer
    *ngIf="!(loadingTopic | async)"
    [page]="currentPage"
    [collectionSize]="(topics | async).length"
    (scrollTopClicked)="onScrollTopClicked()" 
    (pageChange)="onPageChange($event)" >
  </app-list-footer>
  `,
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {
  private currentPage: number = 1;
  private isAdding: boolean;
  private topics: Observable<Topic[]>;
  private loadingTopic: Observable<boolean>;

  constructor(private pageScrollService: PageScrollService,
              @Inject(DOCUMENT) private document: any,
              private uiAction: UIAction,
              private store: Store<AppState>) {
    this.store.dispatch(uiAction.startTopicsLoad());
  }

  ngOnInit() {
    this.topics = this.store.select(state => state.dataState.topics);
    this.loadingTopic = this.store.select(state => state.uiState.loadingTopics);
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
