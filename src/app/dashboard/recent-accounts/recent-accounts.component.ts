import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Account} from "../../shared/models/account.model";

@Component({
  selector: 'app-recent-accounts',
  template: `
  <div class="card mb-3">
    <div class="card-header">
      <span class="lead">Recent Users</span>
    </div>
    <div class="card-block">
    <div class="d-flex justify-content-center">
       <i class="fa fa-spinner fa-pulse fa-fw fa-2x" *ngIf="loadingRecentAccounts"></i>
    </div>
    <div class="d-flex justify-content-center" *ngIf="recentAccounts.length == 0 && !loadingRecentAccounts">
      <span class="lead">There's no recent user</span>
    </div>
    <div *ngIf="recentAccounts.length > 0">
      <app-list-header 
        *ngIf="!loadingRecentAccounts"
        [page]="currentPage"
        (pageChange)="onPageChange($event)" 
        [collectionSize]="recentAccounts?.length"
        [canShowAddButton]="false">
      </app-list-header>
      <table class="table table-striped table-hover" *ngIf="!loadingRecentAccounts">
          <thead>
            <tr class="text-center">
              <th>#</th>
              <th>School Id</th>
              <th>Name</th>
              <th>From</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            <template ngFor let-account [ngForOf]="recentAccounts" let-i="index">
              <tr *ngIf="isIndexInCurrentPage(i)">
                <th scope="row">{{account.user.id}}</th>
                <td>{{account.school_id}}</td>
                <td>{{account.user.full_name}}</td>
                <td>{{account.created_at | amUTCOffset:7 | amTimeAgo}}</td>
                <td class="justify-content-between"><button type="button" class="btn btn-sm btn-outline-primary" (click)="onAccountDetailButtonClicked(account.user.id)">Detail</button></td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./recent-accounts.component.scss']
})
export class RecentAccountsComponent implements OnInit {
  @Input() recentAccounts: Account[];
  @Input() loadingRecentAccounts : boolean;

  @Output() accountDetailButtonClicked = new EventEmitter();

  private currentPage: number = 1;

  constructor() { }

  ngOnInit() {
  }

  private onPageChange($event) {
    this.currentPage = $event;
  }

  private isIndexInCurrentPage(index: number) {
    return index < (this.currentPage * 10) && index >= ((this.currentPage - 1) * 10)
  }

  private onAccountDetailButtonClicked(userId: number) {
    this.accountDetailButtonClicked.emit({
      userId: userId
    });
  }

}
