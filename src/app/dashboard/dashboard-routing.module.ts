import {Routes, RouterModule} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {NgModule} from "@angular/core";
/**
 * Created by vunguyenhung on 3/6/17.
 */

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DashboardRoutingModule { }
