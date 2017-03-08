import {Component, OnInit, Input, OnChanges} from "@angular/core";
import {User} from "../../shared/models/user.model";

@Component({
  selector: 'app-popular-users',
  template: `
  <div class="card mb-3">
    <div class="card-header">
      <span class="lead">Popular Users</span>
    </div>
    <div class="card-block">
      <div class="d-flex justify-content-center">
         <i class="fa fa-spinner fa-pulse fa-fw fa-2x" *ngIf="loadingPopularUsers"></i>
      </div>
      <app-popular-users-chart
        [popularUsers]="sortedPopularUsers">
      </app-popular-users-chart>
    </div>
  </div>
  `,
  styleUrls: ['./popular-users.component.scss']
})
export class PopularUsersComponent implements OnInit , OnChanges{
  @Input() popularUsers: User[];
  @Input() loadingPopularUsers: boolean;

  private sortedPopularUsers: User[];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.sortedPopularUsers = this.sortByLikeAndDislike(this.popularUsers, 10);
  }

  private sortByLikeAndDislike(users: User[], limit: number): User[] {
    if (users.length < 0) return [];
    return users.sort((a: User, b: User) => {
      return (a.likes + a.dislikes) - (b.likes + b.dislikes)
    }).slice(users.length - limit - 1, users.length - 1);
  }

}
