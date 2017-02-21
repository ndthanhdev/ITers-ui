import {Component, OnInit, Input} from "@angular/core";
import {Topic} from "../../../shared/models/topic.model";
import {Thread} from "../../../shared/models/thread.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-topic-detail',
  template: `
  <app-topic-detail-input 
    *ngIf="isEditing"
    [topicTitle]="topic.title"
    [isEditing]="isEditing" 
    (saved)="onInputSaved()">
  </app-topic-detail-input>
  <div class="list-group-item list-group-item-action flex-column align-items-start" *ngIf="!isEditing">
    <div class="d-flex w-100 justify-content-end">
      <h4 class="mr-auto"><span class="lead">#{{topic.id}}</span><a [routerLink]="['/topics', topic.id]" class="ml-2">{{topic.title}}</a></h4>
      <span class="badge badge-pill badge-default align-self-center ml-1 mr-1">Thread: {{topic.threads_count}}</span>
      <span class="badge badge-pill badge-default align-self-center ml-1 mr-1">Post: {{topic.posts_count}}</span>
    </div>
    
    <p *ngIf="latestThread" class="mb-0"><a href="#">{{latestThread.title}}</a></p>
    <div class="d-flex w-100 justify-content-end">
      <small *ngIf="latestThread" class="align-self-center mr-auto"><a href="#" class="mr-2">{{latestThread.user.full_name}}</a>{{latestThread.created_at | amTimeAgo}}</small>
      <button (click)="handleEdit()" type="button" class="btn btn-sm btn-outline-primary"><i class="fa fa-pencil"></i></button>
    </div>
    
  </div>
  `,
  styleUrls: ['topic-detail.component.scss']
})
export class TopicDetailComponent implements OnInit {
  @Input() topic: Topic;
  private latestThread: Thread;
  private isEditing: boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.latestThread = this.topic.latest_threads[0];

  }

  private handleEdit() {
    this.isEditing = true;
    //dispatch ngrx store action
  }

  private onInputSaved() {
    this.isEditing = false;
  }

  private goToTopic($topidId){
    this.router.navigate(['/topics', $topidId])
  }

}
