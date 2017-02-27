import {Component, Input} from "@angular/core";
import {Post} from "../../../shared/models/post.model";
import {Account} from "../../../shared/models/account.model";
import {RoleEnum} from "../../../shared/models/role.model";
import {User} from "../../../shared/models/user.model";

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
      *ngIf="isIndexInCurrentPage(i) && isCurrentAccountCanViewUnconfirmedPost(post)"
      [loggedInAccount]="loggedInAccount"
      [managingMods]="managingMods"
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
export class PostListComponent {
  @Input() posts: Post[];
  @Input() loggedInAccount: Account;
  @Input() managingMods: User[];

  private currentPage: number = 1;

  onPageChange($event) {
    this.currentPage = $event;
  }

  onAddTopicButtonClicked() {
  }

  private isIndexInCurrentPage(index: number): boolean {
    return index < (this.currentPage * 10) && index >= ((this.currentPage - 1) * 10);
  }

  private isCurrentAccountCanViewUnconfirmedPost(post: Post): boolean {
    if (post.confirmed)
      return true;
    else if (!this.loggedInAccount)
      return false;

    switch (this.loggedInAccount.current_role.privilege_level) {
      case RoleEnum.USER:
        return post.user.id == this.loggedInAccount.user.id;
      case RoleEnum.MOD:
        if (this.managingMods)
          return this.managingMods.some(mod => mod.id === this.loggedInAccount.user.id);
        else return false;
      case RoleEnum.ADMIN:
        return true;
    }
  }

}
