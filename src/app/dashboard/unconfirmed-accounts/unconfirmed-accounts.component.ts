import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Account} from "../../shared/models/account.model";

@Component({
  selector: 'app-unconfirmed-accounts',
  template: `
  <div class="card mb-3">
    <div class="card-header">
      <span class="lead">Unconfirmed Users</span>
    </div>
    <div class="card-block">
      <div class="d-flex justify-content-center">
        <i class="fa fa-spinner fa-pulse fa-fw fa-2x" *ngIf="loadingUnConfirmedAccounts"></i>
      </div>
      <div class="d-flex justify-content-center" *ngIf="unconfirmedAccounts.length == 0 && !loadingUnConfirmedAccounts">
        <span class="lead">There's no unconfirmed user right now!</span>
      </div>
      <div *ngIf="unconfirmedAccounts.length > 0">
        <app-list-header 
          *ngIf="!loadingUnConfirmedAccounts"
          [page]="currentPage"
          (pageChange)="onPageChange($event)" 
          [collectionSize]="unconfirmedAccounts?.length"
          [canShowAddButton]="false">
        </app-list-header>
        <table class="table table-striped table-hover" *ngIf="!loadingUnConfirmedAccounts">
          <thead>
            <tr class="text-center">
              <th>#</th>
              <th>Name</th>
              <th>From</th>
              <th>Detail</th>
              <th>Confirm</th>
            </tr>
          </thead>
          <tbody>
            <template ngFor let-account [ngForOf]="unconfirmedAccounts" let-i="index">
              <tr *ngIf="isIndexInCurrentPage(i)">
                <th scope="row">{{account.user.id}}</th>
                <td><a [routerLink]="['/users', account.user.id]">{{account.user.full_name}}</a></td>
                <td>{{account.created_at | amUTCOffset:7 | amTimeAgo}}</td>
                <td class="justify-content-between"><button type="button" class="btn btn-sm btn-outline-primary" (click)="onAccountDetailButtonClicked(account.user.id)">Detail</button></td>
                <td class="justify-content-between"><button type="button" class="btn btn-sm btn-outline-success" (click)="onAccountConfirmButtonClicked(account.user.id)">Confirm</button></td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./unconfirmed-accounts.component.scss']
})
export class UnconfirmedAccountsComponent implements OnInit {
  @Input() unconfirmedAccounts: Account[];
  @Input() loadingUnConfirmedAccounts: boolean;

  @Output() accountDetailButtonClicked = new EventEmitter();
  @Output() accountConfirmButtonClicked = new EventEmitter();

  private currentPage: number = 1;

  constructor() {
  }

  ngOnInit() {
  }

  private isIndexInCurrentPage(index: number) {
    return index < (this.currentPage * 10) && index >= ((this.currentPage - 1) * 10)
  }

  private onPageChange($event) {
    this.currentPage = $event;
  }

  private onAccountDetailButtonClicked(userId: number) {
    this.accountDetailButtonClicked.emit({
      userId: userId
    });
  }

  private onAccountConfirmButtonClicked(userId: number) {
    this.accountConfirmButtonClicked.emit(userId);
  }

}
