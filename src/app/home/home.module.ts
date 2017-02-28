import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomeRoutingModule} from "./home-routing.module";
import {TopicModule} from "./topic/topic.module";
import {ThreadModule} from "./thread/thread.module";
import {PostModule} from "./post/post.module";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ThreadModule,
    TopicModule,
    PostModule,
  ],
  declarations: []
})
export class HomeModule {
}
