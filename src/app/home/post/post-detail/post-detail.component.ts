import {Component, OnInit, Input} from "@angular/core";
import {Post} from "../../../shared/models/post.model";

@Component({
  selector: 'app-post-detail',
  template: `
  <div class="post-list mb-3">
    <div class="card ">
      <div class="card-header d-flex justify-content-between">
          <span class="lead mr-2">
            #{{index+1}} <a [routerLink]="['/users', post.user.id]" class="mr-2">{{post.user.full_name}}</a><small class="text-muted">{{post.created_at | amTimeAgo}}</small>
          </span>
          <button type="button" class="btn btn-sm btn-outline-success" *ngIf="!post.confirmed">Confirm</button>
      </div>
      <div class="card-block" [ngClass]="{'bg-faded': !post.confirmed}">
        <div class="row">
          <div class="col-1 d-flex align-items-center flex-column">
            <i class="fa fa-caret-up fa-3x" aria-hidden="true"></i>
            <span class="lead">{{calculateVotes()}}</span>
            <i class="fa fa-caret-down fa-3x" aria-hidden="true"></i>
          </div>
          <div class="col-11">
            <p class="card-text">{{post.content}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  @Input() post: Post;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

  private calculateVotes(): number{
    let result: number = 0;
    this.post.interacted_users.forEach(user => {
      if(user.pivot.liked)
        result++;
      else result--;
    });
    return result;
  }

}
