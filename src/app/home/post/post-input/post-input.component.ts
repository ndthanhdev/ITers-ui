import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core";

@Component({
  selector: 'app-post-input',
  template: `
  <div class="mb-3" [froalaEditor] [(froalaModel)]="postContent"></div>
  <div class="d-flex justify-content-end mb-4">
    <button type="button" class="btn btn-primary mr-2" 
      *ngIf="isNewPost"
      (click)="onNewPost()" 
      [disabled]="!postContent">New Post <i class="fa fa-spinner fa-pulse fa-fw" *ngIf="creatingPost"></i>
     </button>
     <button type="button" class="btn btn-outline-danger mr-2" 
      *ngIf="isEditPost"
      (click)="onCancelEditPost()">Cancel
     </button>
     <button type="button" class="btn btn-outline-success" 
      *ngIf="isEditPost"
      (click)="onEditPost()" 
      [disabled]="!postContent">Save
     </button>
   </div>
  `,
  styleUrls: ['./post-input.component.scss']
})
export class PostInputComponent implements OnInit {
  @Input() creatingPost: boolean;
  @Input() isNewPost: boolean;
  @Input() isEditPost: boolean;
  @Input() initialContent: string;

  @Output() newPost: EventEmitter<string> = new EventEmitter();
  @Output() editPost: EventEmitter<string> = new EventEmitter();
  @Output() cancelEditPost = new EventEmitter();

  private postContent: string;

  constructor() {
  }

  ngOnInit() {
    this.postContent = this.initialContent;
  }

  private onNewPost() {
    this.newPost.emit(this.postContent);
  }

  private onEditPost() {
    this.editPost.emit(this.postContent);
  }

  private onCancelEditPost() {
    this.cancelEditPost.emit();
  }
}
