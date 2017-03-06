import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Post} from "../../shared/models/post.model";

@Component({
  selector: 'app-unconfirmed-posts',
  template: `
 <div class="card mb-3">
    <div class="card-header">
      <span class="lead">Unconfirmed Posts</span>
    </div>
    <div class="card-block">
      <div class="d-flex justify-content-center">
        <i class="fa fa-spinner fa-pulse fa-fw fa-2x" *ngIf="loadingUnconfirmedPosts"></i>
      </div>
      <app-list-header 
        *ngIf="!loadingUnconfirmedPosts"
        [page]="currentPage"
        (pageChange)="onPageChange($event)" 
        [collectionSize]="unconfirmedPosts?.length"
        [canShowAddButton]="false">
      </app-list-header>
      <table class="table table-striped table-hover" *ngIf="!loadingUnconfirmedPosts">
        <thead>
          <tr class="text-center">
            <th>#</th>
            <th>Content</th>
            <th>By</th>
            <th>Detail</th>
            <th>Confirm</th>
          </tr>
        </thead>
        <tbody>
          <template ngFor let-post [ngForOf]="unconfirmedPosts" let-i="index">
            <tr *ngIf="isIndexInCurrentPage(i)">
              <th scope="row">{{post.id}}</th>
              <td>{{post.content | truncateText: 30}}</td>
              <td><a [routerLink]="['/users', post.user.id]">{{post.user.full_name}}</a></td>
              <td class="justify-content-between"><button type="button" class="btn btn-sm btn-outline-primary" (click)="onPostDetailButtonClicked(post.thread.topic_id, post.thread_id, post.id)">Detail</button></td>
              <td class="justify-content-between"><button type="button" class="btn btn-sm btn-outline-success" (click)="onPostConfirmButtonClicked(post.id)">Confirm</button></td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
  `,
  styleUrls: ['./unconfirmed-posts.component.scss']
})
export class UnconfirmedPostsComponent implements OnInit {
  @Input() unconfirmedPosts: Post[];
  @Input() loadingUnconfirmedPosts: boolean;

  @Output() postDetailButtonClicked = new EventEmitter();
  @Output() postConfirmButtonClicked = new EventEmitter();

  private currentPage: number = 1;

  constructor() {
  }

  ngOnInit() {
  }

  private isIndexInCurrentPage(index: number) {
    return index < (this.currentPage * 10) && index >= ((this.currentPage - 1) * 10)
  }

  private onPageChange($event) {
    this.currentPage = $event;
  }

  private onPostDetailButtonClicked(topicId: number, threadId: number, postId: number) {
    this.postDetailButtonClicked.emit({
      topicId: topicId,
      threadId: threadId,
      postId: postId
    });
  }

  private onPostConfirmButtonClicked(postId: number) {
    this.postConfirmButtonClicked.emit(postId);
  }

}
