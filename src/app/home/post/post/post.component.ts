import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Thread} from "../../../shared/models/thread.model";
import {Observable} from "rxjs";
import {UIAction} from "../../../shared/store/actions/ui.action";
import {Store} from "@ngrx/store";
import {AppState} from "../../../shared/store/reducers/app.reducer";
import {Account} from "../../../shared/models/account.model";
import {User} from "../../../shared/models/user.model";
import {Post} from "../../../shared/models/post.model";

@Component({
  template: `
  <div *ngIf="loadingThread | async" class="d-flex justify-content-center">
    <i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
  </div>
  <div class="jumbotron mb-3" *ngIf="!(loadingThread | async)">
    <h1 class="display-4">{{thread?.title}}</h1>
    <span class="lead text-muted">Created by <a [routerLink]="['/users', thread?.user.id]" class="mr-2">{{thread?.user.full_name}}</a><small class="text-muted">{{thread?.created_at | amUTCOffset:7 | amTimeAgo}}</small></span>
  </div>
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a [routerLink]="['/topics']">Topic</a></li>
    <li class="breadcrumb-item"><a [routerLink]="['/topics', topicId]">Thread</a></li>
    <li class="breadcrumb-item active">Post</li>
  </ol>
  <app-post-list
    *ngIf="!(loadingThread | async)"
    [posts]="posts | async"
    [loggedInAccount]="loggedInAccount | async"
    [managingMods]="managingMods | async"
    (postVoted)="onPostVote($event)"
    (postEdited)="onPostEdited($event)"
    >
  </app-post-list>
  <hr>
  <app-post-input 
    *ngIf="!(loadingThread | async) && (loggedInAccount | async) != null"
    [isNewPost]="true"
    [creatingPost]="creatingPost| async"
    (newPost)="onNewPost($event)">
  </app-post-input>
  `,
  styleUrls: ['post.component.scss']
})
export class PostComponent implements OnInit{
  private topicId: number;
  private threadId: number;
  private thread: Thread;
  private loadingThread: Observable<boolean>;
  private loggedInAccount: Observable<Account>;
  private managingMods: Observable<User[]>;
  private creatingPost: Observable<boolean>;
  private posts: Observable<Post[]>;

  constructor(private route: ActivatedRoute,
              private uiAction: UIAction,
              private store: Store<AppState>) {
    this.topicId = route.snapshot.params['topicId'];
    this.threadId = route.snapshot.params['threadId'];
    this.store.dispatch(uiAction.startThreadLoad(this.topicId, this.threadId));
  }

  ngOnInit() {
    this.store.select(state => state.dataState.thread).subscribe(thread => this.thread = thread);
    this.posts = this.store.select(state => state.dataState.thread.oldest_posts);
    this.loadingThread = this.store.select(state => state.uiState.loadingThread);
    this.loggedInAccount = this.store.select(state => state.dataState.loggedInAccount);
    this.managingMods = this.store.select(state => {
      if (state.dataState.topic)
        return state.dataState.topic.users
    });
    this.creatingPost = this.store.select(state => state.uiState.creatingPost);
  }

  private onNewPost($event) {
    this.store.dispatch(this.uiAction.startPostCreate(this.topicId, this.threadId, $event));
  }

  private onPostVote($event){
    this.store.dispatch(this.uiAction.startPostVote($event.postId, $event.liked));
  }

  private onPostEdited($event){

  }
}
