import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-topic-list',
  template: `
  <app-list-header (pageChange)="onPageChange($event)" [page]="currentPage"></app-list-header>
 <!--START TOPIC LIST COMPONENT-->
  <div class="list-group mb-3">

    <!--START TOPIC LIST DETAIL -->
    <div class="list-group-item list-group-item-action flex-column align-items-start">
      <div class="d-flex w-100 justify-content-end">
        <h4 class="mr-auto"><a href="#">Topic Title</a></h4>
        <span class="badge badge-pill badge-default align-self-center ml-1 mr-1">Thread: 10</span>
        <span class="badge badge-pill badge-default align-self-center ml-1 mr-1">Post: 10</span>
      </div>
      <p class="mb-0"><a href="#">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
        blandit.</a></p>
      <div class="d-flex w-100 justify-content-between">
        <small class="align-self-center"><a href="#">Vu Nguyen Hung</a>, 9 minutes ago</small>
        <button type="button" class="btn btn-sm btn-outline-primary"><i class="fa fa-pencil"></i></button>
      </div>
    </div>
    <!--END TOPIC LIST DETAIL -->
    
        <!--START TOPIC DETAIL EDIT-->
    <div class="list-group-item flex-column align-items-start">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Topic Edit" aria-describedby="basic-addon1">
        <button type="button" class="btn btn-outline-success ml-2"><i class="fa fa-check" aria-hidden="true"></i>
        </button>
        <!--<button type="button" class="btn btn-outline-danger ml-2"><i class="fa fa-times" aria-hidden="true"></i></button>-->
        <button type="button" class="btn btn-outline-danger ml-2">Delete</button>
      </div>
    </div>
    <!--START TOPIC DETAIL EDIT-->

    <!--START TOPIC DETAIL ADD-->
    <div class="list-group-item flex-column align-items-start">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Topic Add" aria-describedby="basic-addon1">
        <button type="button" class="btn btn-outline-success ml-2"><i class="fa fa-check" aria-hidden="true"></i>
        </button>
        <button type="button" class="btn btn-outline-danger ml-2"><i class="fa fa-times" aria-hidden="true"></i></button>
      </div>
    </div>
    <!--START TOPIC DETAIL EDIT-->

  </div>
  <!--END TOPIC LIST COMPONENT-->
  <app-list-footer (pageChange)="onPageChange($event)" [page]="currentPage"></app-list-footer>
  `,
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {
  private currentPage: number = 1;

  constructor() {
  }

  ngOnInit() {
  }

  private onPageChange($event) {
    this.currentPage = $event;
  }
}
