import {Component, Input, Inject, OnInit, Output, EventEmitter} from "@angular/core";
import {Post} from "../../../shared/models/post.model";
import {Account} from "../../../shared/models/account.model";
import {RoleEnum} from "../../../shared/models/role.model";
import {User} from "../../../shared/models/user.model";
import {PageScrollService, PageScrollInstance} from "ng2-page-scroll";
import {DOCUMENT} from "@angular/platform-browser";

@Component({
  selector: 'app-post-list',
  template: `
  <app-list-header 
    [page]="currentPage"
    [collectionSize]="filteredPosts?.length"
    [canShowAddButton]="canShowAddButton()"
    (pageChange)="onPageChange($event)" 
    (addClicked)="onAddPostButtonClicked()">
  </app-list-header>
  <div *ngIf="filteredPosts.length == 0" class="d-flex justify-content-center">
    <span class="lead">This thread doesn't have any post or those posts haven't confirmed yet. Please comeback later.
      <button type="button" class="btn btn-outline-primary" (click)="onAddPostButtonClicked()" *ngIf="loggedInAccount">Create one</button>
    </span>
  </div>
  <template ngFor let-post [ngForOf]="posts" let-i="index">
    <app-post-detail
      *ngIf="isIndexInCurrentPage(i) && isCurrentAccountCanViewUnconfirmedPost(post)"
      [loggedInAccount]="loggedInAccount"
      [managingMods]="managingMods"
      [post]="post"
      [index]="i"
      (upVoted)="onVoted({
          postId: $event,
          liked: true
      })"
      (downVoted)="onVoted({
          postId: $event,
          liked: false 
      })"
      (editPost)="onEditPost($event)"
      (confirmPost)="onChangePostState($event)"
      (blockPost)="onChangePostState($event)">
    </app-post-detail>
  </template>
  <app-list-footer
    [page]="currentPage"
    [collectionSize]="filteredPosts?.length"
    (scrollTopClicked)="onScrollTopClicked()" 
    (pageChange)="onPageChange($event)">
  </app-list-footer>
  `,
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() posts: Post[];
  @Input() loggedInAccount: Account;
  @Input() managingMods: User[];

  @Output() postVoted = new EventEmitter();
  @Output() postEdited = new EventEmitter();
  @Output() postStateChanged = new EventEmitter();

  private currentPage: number = 1;
  private filteredPosts: Post[];

  constructor(private pageScrollService: PageScrollService,
              @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit(): void {
    this.filteredPosts = this.posts.filter(post => this.isCurrentAccountCanViewUnconfirmedPost(post));
  }

  onPageChange($event) {
    this.currentPage = $event;
  }

  private onAddPostButtonClicked() {
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#app-bot');
    this.pageScrollService.start(pageScrollInstance);
  }

  private isIndexInCurrentPage(index: number): boolean {
    return index < (this.currentPage * 10) && index >= ((this.currentPage - 1) * 10);
  }

  private isCurrentAccountCanViewUnconfirmedPost(post: Post): boolean {
    if (post.confirmed)
      return true;
    else if (!this.loggedInAccount)
      return false;
    else if (post.user.id == this.loggedInAccount.user.id)
      return true;

    switch (this.loggedInAccount.current_role.privilege_level) {
      case RoleEnum.MOD:
        if (this.managingMods)
          return this.managingMods.some(mod => mod.id === this.loggedInAccount.user.id);
        else return false;
      case RoleEnum.ADMIN:
        return true;
    }
  }

  private canShowAddButton(): boolean {
    return this.loggedInAccount != null;
  }

  private onVoted($event) {
    this.postVoted.emit($event);
  }

  private onEditPost($event) {
    this.postEdited.emit($event);
  }

  private onChangePostState($event){
    this.postStateChanged.emit($event);
  }
}
