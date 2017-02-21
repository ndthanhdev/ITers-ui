import {Component, OnInit, Input} from "@angular/core";
import {Thread} from "../../../shared/models/thread.model";

@Component({
  selector: 'app-thread-detail',
  template: `
  <div class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-end">
      <h4 class="mr-auto"><span class="lead">#{{thread.id}}</span><a href="#" class="ml-2">{{thread.title}}</a></h4>
      <span class="badge badge-pill badge-default align-self-center ml-1 mr-1">Post: {{thread.latest_posts.length}}</span>
    </div>
    <p class="mb-0">By <a href="#" class="mr-1">{{thread.user.full_name}}</a>{{thread.created_at | amTimeAgo}}</p>
    <div class="d-flex w-100 justify-content-end">
      <small class="align-self-center mr-auto">Last post by <a href="#" class="mr-1">{{thread.latest_posts[0]?.user.full_name}}</a>{{thread.latest_posts[0]?.created_at | amTimeAgo}}</small>
    </div>
  </div>
  `,
  styleUrls: ['./thread-detail.component.scss']
})
export class ThreadDetailComponent implements OnInit {
  @Input() thread: Thread;

  constructor() { }

  ngOnInit() {
  }

}
