import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Topic} from "../../../shared/models/topic.model";
import {Thread} from "../../../shared/models/thread.model";

@Component({
  selector: 'app-topic-detail',
  template: `
  <app-topic-detail-input 
    *ngIf="isEditing"
    [topicTitle]="topic.title"
    [isEditing]="isEditing" 
    (canceled)="onInputCanceled()"
    (saved)="onInputSaved($event)">
  </app-topic-detail-input>
  <div class="list-group-item list-group-item-action flex-column align-items-start" *ngIf="!isEditing">
    <div class="d-flex w-100 justify-content-end">
      <h4 class="mr-auto"><span class="lead">#{{topic.id}}</span><a [routerLink]="['/topics', topic.id]" class="ml-2">{{topic.title}}</a></h4>
      <span class="badge badge-pill badge-default align-self-center ml-1 mr-1">Thread: {{topic.threads_count || 0}}</span>
      <span class="badge badge-pill badge-default align-self-center ml-1 mr-1">Post: {{topic.posts_count || 0}}</span>
    </div>
    
    <p *ngIf="latestThread" class="mb-0"><a [routerLink]="['/topics', topic.id, 'threads', latestThread.id]">{{latestThread.title}}</a></p>
    <div class="d-flex w-100 justify-content-end">
      <small *ngIf="latestThread" class="align-self-center mr-auto"><a [routerLink]="['/users', latestThread.user.id]" class="mr-2">{{latestThread.user.full_name}}</a>{{latestThread.created_at | amUTCOffset:7 | amTimeAgo}}</small>
      <!--<button (click)="handleEdit()" type="button" class="btn btn-sm btn-outline-primary"><i class="fa fa-pencil"></i></button>-->
    </div>
  </div>
  `,
  styleUrls: ['topic-detail.component.scss']
})
export class TopicDetailComponent implements OnInit {
  @Input() topic: Topic;

  @Output() topicEdited = new EventEmitter();

  private latestThread: Thread;
  private isEditing: boolean = false;

  constructor() {
  }

  ngOnInit() {
    this.latestThread = this.topic.latest_threads[0];
  }

  private handleEdit() {
    this.isEditing = true;
    //dispatch ngrx store action
  }

  private onInputSaved($event) {
    this.topicEdited.emit({
      topicId: this.topic.id,
      topicTitle: $event
    });
    this.isEditing = false;
  }

  private onInputCanceled(){
    this.isEditing = false;
  }
}
