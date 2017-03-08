import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {PopularThreadsComponent} from "./popular-threads/popular-threads.component";
import {UnconfirmedPostsComponent} from "./unconfirmed-posts/unconfirmed-posts.component";
import {SharedModule} from "../shared/shared.module";
import {RecentPostsComponent} from "./recent-posts/recent-posts.component";
import {SettingsComponent} from "./settings/settings.component";
import {SettingService} from "./settings/setting.service";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {PopularThreadsChartComponent} from "./popular-threads/popular-threads-chart/popular-threads-chart.component";
import {PopularUsersComponent} from "./popular-users/popular-users.component";
import {PopularUsersChartComponent} from "./popular-users/popular-users-chart/popular-users-chart.component";

google.charts.load('current', {'packages': ['corechart']});

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    FormsModule,
    DashboardRoutingModule
  ],
  providers: [SettingService],
  declarations: [DashboardComponent, PopularThreadsComponent, UnconfirmedPostsComponent, RecentPostsComponent, SettingsComponent, PopularThreadsChartComponent, PopularUsersComponent, PopularUsersChartComponent]
})
export class DashboardModule { }
