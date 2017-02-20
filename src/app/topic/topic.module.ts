import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TopicRoutingModule} from "./topic-routing.module";
import {TopicListComponent} from "./topic-list/topic-list.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TopicRoutingModule
  ],
  declarations: [TopicListComponent],
  exports: [TopicListComponent]
})
export class TopicModule {
}
