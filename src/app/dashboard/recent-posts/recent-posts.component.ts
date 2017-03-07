import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Post} from "../../shared/models/post.model";

@Component({
  selector: 'app-recent-posts',
  template: `
  <div class="card mb-3">
    <div class="card-header">
      <span class="lead">Recent Posts</span>
    </div>
    <div class="card-block">
    <div class="d-flex justify-content-center">
       <i class="fa fa-spinner fa-pulse fa-fw fa-2x" *ngIf="loadingRecentPosts"></i>
    </div>
    <app-list-header 
      *ngIf="!loadingRecentPosts"
      [page]="currentPage"
      (pageChange)="onPageChange($event)" 
      [collectionSize]="recentPosts?.length"
      [canShowAddButton]="false">
    </app-list-header>
    <table class="table table-striped table-hover" *ngIf="!loadingRecentPosts">
        <thead>
          <tr class="text-center">
            <th>#</th>
            <th>Content</th>
            <th>By</th>
            <th>From</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          <template ngFor let-post [ngForOf]="recentPosts" let-i="index">
            <tr *ngIf="isIndexInCurrentPage(i)">
              <th scope="row">{{post.id}}</th>
              <td>{{post.content | truncateText: 30}}</td>
              <td><a [routerLink]="['/users', post.user.id]">{{post.user.full_name}}</a></td>
              <td>{{post.created_at | amUTCOffset:7 | amTimeAgo}}</td>
              <td class="justify-content-between"><button type="button" class="btn btn-sm btn-outline-primary" (click)="onPostDetailButtonClicked(post.thread.topic_id, post.thread_id, post.id)">Detail</button></td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
  `,
  styleUrls: ['./recent-posts.component.scss']
})
export class RecentPostsComponent implements OnInit {
  @Input() recentPosts: Post[];
  @Input() loadingRecentPosts: boolean;

  @Output() postDetailButtonClicked = new EventEmitter();

  private currentPage: number = 1;

  constructor() {
  }

  ngOnInit() {
  }

  private onPageChange($event) {
    this.currentPage = $event;
  }

  private isIndexInCurrentPage(index: number) {
    return index < (this.currentPage * 10) && index >= ((this.currentPage - 1) * 10)
  }

  private onPostDetailButtonClicked(topicId: number, threadId: number, postId: number) {
    this.postDetailButtonClicked.emit({
      topicId: topicId,
      threadId: threadId,
      postId: postId
    });
  }
}
