import {Component, OnInit, Input, Output, EventEmitter, Inject} from "@angular/core";
import {PageScrollService, PageScrollInstance} from "ng2-page-scroll";
import {DOCUMENT} from "@angular/platform-browser";

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
    <button type="button" class="btn btn-outline-primary align-self-start"
      *ngIf="canShowScrollTopButton"
      placement="left" 
      ngbTooltip="Go to top"
      (click)="onScrollTopClicked()">
      <i class="fa fa-arrow-up" aria-hidden="true"></i>
    </button>
  </div>
  `,
  styleUrls: ['./list-footer.component.scss']
})
export class ListFooterComponent implements OnInit {
  @Input() page: number;
  @Input() collectionSize: number;
  @Input() canShowScrollTopButton : boolean = true;

  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  constructor(private pageScrollService: PageScrollService,
              @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit() {
  }

  private onPageChange($event) {
    this.pageChange.emit($event);
  }

  private onScrollTopClicked() {
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#app-top');
    this.pageScrollService.start(pageScrollInstance);
  }

}
