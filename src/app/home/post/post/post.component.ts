import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Thread} from "../../../shared/models/thread.model";
import {Observable} from "rxjs";
import {UIAction} from "../../../shared/store/actions/ui.action";
import {Store} from "@ngrx/store";
import {AppState} from "../../../shared/store/reducers/app.reducer";

@Component({
  template: `
  <div *ngIf="loadingThread | async" class="d-flex justify-content-center">
    <i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
  </div>
  <div class="jumbotron mb-3" *ngIf="!(loadingThread | async)">
    <h1 class="display-4">{{thread?.title}}</h1>
    <span class="lead">Created by <a href="#" class="mr-2">{{thread?.user.full_name}}</a><small class="text-muted">{{thread?.created_at | amTimeAgo}}</small></span>
  </div>
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a [routerLink]="['/topics']">Topic</a></li>
    <li class="breadcrumb-item"><a [routerLink]="['/topics', topicId]">Thread</a></li>
    <li class="breadcrumb-item active">Post</li>
  </ol>
  <app-post-list
    [posts]="thread?.oldest_posts"
    *ngIf="!(loadingThread | async)">
  </app-post-list>
  <hr>
  <app-post-input *ngIf="!(loadingThread | async)"></app-post-input>
  `,
  styleUrls: ['post.component.scss']
})
export class PostComponent implements OnInit {
  private topicId : number;
  private threadId: number;
  private thread: Thread;
  private loadingThread: Observable<boolean>;

  constructor(private route: ActivatedRoute,
              private uiAction: UIAction,
              private store: Store<AppState>) {
    this.topicId =route.snapshot.params['topicId'];
    this.threadId = route.snapshot.params['threadId'];
    this.store.dispatch(uiAction.startThreadLoad(this.topicId, this.threadId));
  }

  ngOnInit() {
    this.store.select(state => state.dataState.thread).subscribe(thread => this.thread = thread);
    this.loadingThread = this.store.select(state => state.uiState.loadingThread);
  }

}
