import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TopicRoutingModule} from "./topic-routing.module";
import {TopicListComponent} from "./topic-list/topic-list.component";
import {SharedModule} from "../shared/shared.module";
import {TopicDetailComponent} from "./topic-detail/topic-detail.component";
import {TopicDetailInputComponent} from "./topic-detail-input/topic-detail-input.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TopicRoutingModule
  ],
  declarations: [TopicListComponent, TopicDetailComponent, TopicDetailInputComponent],
  exports: [TopicListComponent]
})
export class TopicModule {
}
