import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core";

@Component({
  selector: 'app-list-header',
  template: `
  <div class="d-flex justify-content-end">
    <ngb-pagination class="mr-auto"
    (pageChange)="onPageChange($event)"
    [collectionSize]="collectionSize" 
    [maxSize]="5" 
    [pageSize]="10" 
    [boundaryLinks]="true"
    [page]="page"></ngb-pagination>
    <button (click)="onAddClicked()" type="button" class="btn btn-outline-primary align-self-start">+</button>
  </div>
  `,
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent implements OnInit {
  @Input() page: number;
  @Input() collectionSize: number;

  @Output() pageChange: EventEmitter<number> = new EventEmitter();
  @Output() addClicked = new EventEmitter();

  constructor() {
    this.collectionSize = 22; // TODO: remove this when got data from server
  }

  ngOnInit() {
  }

  private onPageChange($event) {
    this.pageChange.emit($event);
  }

  private onAddClicked() {
    this.addClicked.emit();
  }

}
