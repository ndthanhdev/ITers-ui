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
  </div>
  <app-list-footer (scrollTopClicked)="onScrollTopClicked()" (pageChange)="onPageChange($event)" [page]="currentPage"></app-list-footer>
  `,
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {
  private currentPage: number = 1;
  private isAdding: boolean;
  private topics: Observable<Topic[]>;

  constructor(private pageScrollService: PageScrollService,
              @Inject(DOCUMENT) private document: any,
              private uiAction: UIAction,
              private store: Store<AppState>) {
    this.store.dispatch(uiAction.startTopicsLoad());
  }

  ngOnInit() {
    this.topics = this.store.select(state => state.dataState.topics);
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
