import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UIAction} from "../../../shared/store/actions/ui.action";
import {AppState} from "../../../shared/store/reducers/app.reducer";
import {Store} from "@ngrx/store";
import {Topic} from "../../../shared/models/topic.model";
import {Observable} from "rxjs";
import {Account} from "../../../shared/models/account.model";

@Component({
  template: `
  <div *ngIf="loadingTopic | async" class="d-flex justify-content-center">
    <i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
  </div>
  <div class="jumbotron mb-3" *ngIf="!(loadingTopic | async)">
    <h1 class="display-4">{{topic?.title}}</h1>
    <span class="lead text-muted" *ngIf="topic?.users.length > 0">
      Mods: <a  class="mr-2" 
      *ngFor="let user of topic?.users" 
      [routerLink]="['/users', user.id]">
      <i class="fa fa-user mr-1"></i>{{user.full_name}}</a>
    </span>
  </div>
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a [routerLink]="['/topics']">Topic</a></li>
    <li class="breadcrumb-item active">Thread</li>
  </ol>
  <app-thread-list
    *ngIf="!(loadingTopic | async)"
    [creatingThread]="creatingThread"
    [loggedInAccount]="loggedInAccount | async"
    [threads]="topic.latest_threads"
    (threadSaved)="onThreadSave($event)">
  </app-thread-list>
  `,
  styleUrls: ['thread.component.scss']
})
export class ThreadComponent implements OnInit {
  private topicId: number;
  private topic: Topic;
  private loadingTopic : Observable<boolean>;
  private loggedInAccount : Observable<Account>;
  private creatingThread: boolean;

  constructor(private route: ActivatedRoute,
              private uiAction: UIAction,
              private store: Store<AppState>) {
    this.topicId = route.snapshot.params['topicId'];
    this.store.dispatch(uiAction.startTopicLoad(this.topicId));
  }

  ngOnInit() {
    this.store.select(state => state.dataState.topic).subscribe(topic => this.topic = topic);
    this.loadingTopic = this.store.select(state => state.uiState.loadingTopic);
    this.loggedInAccount = this.store.select(state => state.dataState.loggedInAccount);
    this.store.select(state => state.uiState.creatingThread).subscribe(creatingThread => this.creatingThread = creatingThread);
  }

  // $event: threadTitle, postContent
  // topicId
  private onThreadSave($event){
    this.store.dispatch(this.uiAction.startThreadCreate($event.threadTitle, $event.postContent, this.topicId));
  }
}
