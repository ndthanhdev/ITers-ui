import {Component, Output, EventEmitter, Input} from "@angular/core";

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
    <button (click)="onAddClicked()" type="button" class="btn btn-outline-primary align-self-start" *ngIf="canShowAddButton">+</button>
  </div>
  `,
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent{
  @Input() page: number;
  @Input() collectionSize: number;
  @Input() canShowAddButton: boolean = true;

  @Output() pageChange: EventEmitter<number> = new EventEmitter();
  @Output() addClicked = new EventEmitter();

  private onPageChange($event) {
    this.pageChange.emit($event);
  }

  private onAddClicked() {
    this.addClicked.emit();
  }

}
