import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {PostComponent} from "./post/post.component";

const routes: Routes = [
  {
    path: '',
    component: PostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PostRoutingModule { }
