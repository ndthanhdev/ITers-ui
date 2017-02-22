import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/home/topic/topic.module#TopicModule'
  },
  {
    path: ':topicId',
    loadChildren: 'app/home/thread/thread.module#ThreadModule'
  },
  {
    path: ':topicId/threads/:threadId',
    loadChildren: 'app/home/post/post.module#PostModule'
  }
  // not found here?
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule {
}
