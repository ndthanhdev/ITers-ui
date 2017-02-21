import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomeRoutingModule} from "./home-routing.module";
import {TopicModule} from "../topic/topic.module";

@NgModule({
  imports: [
    CommonModule,
    TopicModule,
    HomeRoutingModule
  ],
  declarations: []
})
export class HomeModule {
}
