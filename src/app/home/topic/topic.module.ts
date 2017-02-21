import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TopicRoutingModule} from "./topic-routing.module";
import {TopicListComponent} from "./topic-list/topic-list.component";
import {TopicDetailComponent} from "./topic-detail/topic-detail.component";
import {TopicDetailInputComponent} from "./topic-detail-input/topic-detail-input.component";
import {TopicService} from "./topic.service";
import {HttpModule} from "@angular/http";
import {MomentModule} from "angular2-moment";
import {TopicComponent} from "./topic/topic.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpModule,
    MomentModule,
    TopicRoutingModule
  ],
  declarations: [TopicListComponent, TopicDetailComponent, TopicDetailInputComponent, TopicComponent],
  providers: [TopicService]
})
export class TopicModule {
}
