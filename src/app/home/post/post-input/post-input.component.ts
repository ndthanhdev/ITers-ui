import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core";

@Component({
  selector: 'app-post-input',
  template: `
  <div class="mb-3" [froalaEditor] [(froalaModel)]="postContent"></div>
  <button type="button" class="btn btn-primary float-right mb-4" (click)="onNewPost()" [disabled]="!postContent">New Post <i class="fa fa-spinner fa-pulse fa-fw" *ngIf="creatingPost"></i></button>
  `,
  styleUrls: ['./post-input.component.scss']
})
export class PostInputComponent implements OnInit{

  @Input() creatingPost: boolean;

  @Output() newPost: EventEmitter<string> = new EventEmitter();

  private postContent: string;

  constructor() {
  }

  ngOnInit() {
  }

  private onNewPost() {
    this.newPost.emit(this.postContent);
  }
}
