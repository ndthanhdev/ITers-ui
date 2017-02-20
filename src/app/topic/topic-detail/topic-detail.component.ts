import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-topic-detail',
  template: `
  <app-topic-detail-input 
    *ngIf="isEditing" 
    [isEditing]="isEditing" 
    (saved)="onInputSaved()"
    (canceled)="onInputCanceled()">
  </app-topic-detail-input>
  <div class="list-group-item list-group-item-action flex-column align-items-start" *ngIf="!isEditing">
    <div class="d-flex w-100 justify-content-end">
      <h4 class="mr-auto"><a href="#">Topic Title</a></h4>
      <span class="badge badge-pill badge-default align-self-center ml-1 mr-1">Thread: 10</span>
      <span class="badge badge-pill badge-default align-self-center ml-1 mr-1">Post: 10</span>
    </div>
    <p class="mb-0"><a href="#">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
      blandit.</a></p>
    <div class="d-flex w-100 justify-content-between">
      <small class="align-self-center"><a href="#">Vu Nguyen Hung</a>, 9 minutes ago</small>
      <button (click)="handleEdit()" type="button" class="btn btn-sm btn-outline-primary"><i class="fa fa-pencil"></i></button>
    </div>
  </div>
  `,
  styleUrls: ['./topic-detail.component.scss']
})
export class TopicDetailComponent implements OnInit {
  private isEditing: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  private handleEdit() {
    this.isEditing = true;
    //dispatch ngrx store action
  }

  private onInputSaved() {
    this.isEditing = false;
  }

  private onInputCanceled() {
    this.isEditing = false;
  }

}
