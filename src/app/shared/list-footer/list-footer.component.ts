import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";

@Component({
  selector: 'app-list-footer',
  template: `
  <div class="d-flex justify-content-end">
    <ngb-pagination class="mr-auto"
      (pageChange)="onPageChange($event)"
      [collectionSize]="collectionSize" 
      [maxSize]="5" 
      [pageSize]="10"
      [page]="page" 
      [boundaryLinks]="true"></ngb-pagination>
    <button type="button" class="btn btn-outline-primary align-self-start">
      <i class="fa fa-arrow-up" aria-hidden="true"></i>
    </button>
  </div>
  `,
  styleUrls: ['./list-footer.component.scss']
})
export class ListFooterComponent implements OnInit {
  @Input() page: number;
  @Input() collectionSize: number;

  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.collectionSize = 22; // TODO: remove this when got data from server
  }

  ngOnInit() {
  }

  private onPageChange($event) {
    this.pageChange.emit($event);
  }

}
