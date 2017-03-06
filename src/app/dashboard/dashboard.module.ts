import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RecentPostComponent} from "./recent-post/recent-post.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  declarations: [DashboardComponent, RecentPostComponent]
})
export class DashboardModule { }
