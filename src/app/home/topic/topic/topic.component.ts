import {Component, OnInit} from "@angular/core";
import {UIAction} from "../../../shared/store/actions/ui.action";
import {Store} from "@ngrx/store";
import {AppState} from "../../../shared/store/reducers/app.reducer";
import {Observable} from "rxjs";
import {Topic} from "../../../shared/models/topic.model";
import {Account} from "../../../shared/models/account.model";

@Component({
  template: `
  <div class="jumbotron mb-3">
    <h1 class="display-4">ITers</h1>
    <span class="lead text-muted">Forum for TDT IT Student</span>
  </div>
  <ol class="breadcrumb">
    <li class="breadcrumb-item active">Topic</li>
  </ol>
  <div *ngIf="loadingTopics | async" class="d-flex justify-content-center">
    <i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
  </div>
  <app-topic-list 
    *ngIf="!(loadingTopics | async)"
    [creatingTopic]="creatingTopic | async"
    [loggedInAccount]="loggedInAccount | async"
    [topics]="topics | async"
    (topicSaved)="onTopicSave($event)"
    (topicEdited)="onTopicEdit($event)">
  </app-topic-list>
  `,
  styleUrls: ['topic.component.scss']
})
export class TopicComponent implements OnInit {
  private topics: Observable<Topic[]>;
  private loadingTopics: Observable<boolean>;
  private loggedInAccount: Observable<Account>;
  private creatingTopic: Observable<boolean>;

  constructor(private uiAction: UIAction,
              private store: Store<AppState>) {
    this.store.dispatch(uiAction.startTopicsLoad());
  }

  ngOnInit() {
    this.topics = this.store.select(state => state.dataState.topics);
    this.loadingTopics = this.store.select(state => state.uiState.loadingTopics);
    this.loggedInAccount = this.store.select(state => state.dataState.loggedInAccount);
    this.creatingTopic = this.store.select(state => state.uiState.creatingTopic);
  }

  private onTopicSave($event) {
    this.store.dispatch(this.uiAction.startTopicCreate($event));
  }

  private onTopicEdit($event) {
    this.store.dispatch(this.uiAction.startTopicEdit($event.topicId, $event.topicTitle));
  }

}
