import {Component, Input, Output, EventEmitter, OnChanges} from "@angular/core";
import {Post} from "../../../shared/models/post.model";
import {Account} from "../../../shared/models/account.model";
import {User} from "../../../shared/models/user.model";
import {RoleEnum} from "../../../shared/models/role.model";

@Component({
  selector: 'app-post-detail',
  template: `
  <div class="post-list mb-3" *ngIf="!isEditPost">
    <div class="card ">
      <div class="card-header d-flex justify-content-end">
          <span class="lead mr-auto">
            #{{index+1}} <a [routerLink]="['/users', post.user.id]" class="mr-2">{{post.user.full_name}}</a><small class="text-muted">{{post.created_at | amUTCOffset:7 | amTimeAgo}}</small>
          </span>
          <!--IF MANAGING MOD OR ADMIN-->
          <button type="button" class="btn btn-sm btn-outline-success" *ngIf="canShowConfirmButton()">Confirm</button>
          
          <!--IF OWNER && !POST.CONFIRMED-->
          <button type="button" class="btn btn-sm btn-outline-primary ml-2" *ngIf="canShowEditButton()" (click)="onEditPostButtonClicked()">Edit</button>
      </div>
      <div class="card-block" [ngClass]="{'bg-faded': !post.confirmed}">
        <div class="row">
          <div class="col-1 d-flex align-items-center justify-content-center flex-column text-center">
            <i class="fa fa-caret-up fa-3x vote-caret" aria-hidden="true" 
              (click)="onUpVote(post.id)"
              [hidden]="!loggedInAccount"
              [ngClass]="{'text-primary': isCurrentAccountInteracted() === 1}">
            </i>
            <span class="lead align-self-center" *ngIf="!loggedInAccount">Votes:</span>
            <span class="lead">{{calculateVotes()}}</span>
            <i class="fa fa-caret-down fa-3x vote-caret" aria-hidden="true"
              [hidden]="!loggedInAccount"
              (click)="onDownVote(post.id)"
              [ngClass]="{'text-primary': isCurrentAccountInteracted() === -1}">
            </i>
          </div>
          <div class="col-11">
            <div class="card-text" [froalaView]="post.content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <app-post-input
      *ngIf="isEditPost"
      [isEditPost]="isEditPost"
      [initialContent]="post.content"
      (editPost)="onEditPost({
          postId: post.id,
          postContent: $event
      })"
      (cancelEditPost)="onCancelEditPost()">
  </app-post-input>
  `,
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnChanges {
  @Input() post: Post;
  @Input() managingMods: User[];
  @Input() loggedInAccount: Account;
  @Input() index: number;

  @Output() upVoted: EventEmitter<number> = new EventEmitter();
  @Output() downVoted: EventEmitter<number> = new EventEmitter();
  @Output() editPost = new EventEmitter();

  private isEditPost: boolean = false;

  constructor() {
  }

  ngOnChanges(): void {
  }

  private calculateVotes(): number {
    let votes: number = 0;
    this.post.interacted_users.forEach(user => {
      if (user.pivot.liked)
        votes++;
      else votes--;
    });
    return votes;
  }

  private canShowEditButton(): boolean {
    return !this.post.confirmed && this.loggedInAccount.user.id === this.post.user.id
  }

  private canShowConfirmButton(): boolean {
    if (this.post.confirmed)
      return false;
    else if (this.loggedInAccount.current_role.is(RoleEnum.ADMIN))
      return true;
    else if (this.loggedInAccount.current_role.is(RoleEnum.MOD))
      if (this.managingMods)
        return this.managingMods.some(mod => mod.id === this.loggedInAccount.user.id);
      else return false;
  }

  //like : 1, dislike: -1, none: 0
  private isCurrentAccountInteracted(): number {
    if (!this.loggedInAccount) return 0;
    let interactedUser = this.post.interacted_users.find(user => {
      return user.id === this.loggedInAccount.user.id
    });
    if (!interactedUser) return 0;
    else if (interactedUser.pivot.liked) return 1;
    else return -1;
  }

  private onUpVote($event) {
    this.upVoted.emit($event)
  }

  private onDownVote($event) {
    this.downVoted.emit($event)
  }

  private onEditPost($event) {
    this.editPost.emit($event);
    this.post.content = $event.postContent;
    this.isEditPost = false;
  }

  private onCancelEditPost(){
    this.isEditPost = false;
  }


  private onEditPostButtonClicked() {
    this.isEditPost = true;
  }


}
