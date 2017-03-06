import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {PopularThreadsComponent} from "./popular-threads/popular-threads.component";
import {UnconfirmedPostsComponent} from "./unconfirmed-posts/unconfirmed-posts.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [DashboardComponent, PopularThreadsComponent, UnconfirmedPostsComponent]
})
export class DashboardModule { }
