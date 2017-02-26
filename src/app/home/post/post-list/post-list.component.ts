import {Component, OnInit, Input} from "@angular/core";
import {Post} from "../../../shared/models/post.model";

@Component({
  selector: 'app-post-list',
  template: `
  <app-list-header 
    [page]="currentPage"
    [collectionSize]="posts?.length"
    (pageChange)="onPageChange($event)" 
    (addClicked)="onAddTopicButtonClicked()">
  </app-list-header>
  <template ngFor let-post [ngForOf]="posts" let-i="index">
    <app-post-detail
      *ngIf="i < (currentPage * 10) && i >= ((currentPage - 1) * 10)"
      [post]="post"
      [index]="i">
    </app-post-detail>
  </template>
  <app-list-footer
    [page]="currentPage"
    [collectionSize]="posts?.length"
    (scrollTopClicked)="onScrollTopClicked()" 
    (pageChange)="onPageChange($event)">
  </app-list-footer>
  `,
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() posts: Post[];
  private currentPage: number = 1;

  constructor() {
  }

  ngOnInit() {
  }

  onPageChange($event) {
    this.currentPage = $event;
  }

  onAddTopicButtonClicked() {

  }
}
