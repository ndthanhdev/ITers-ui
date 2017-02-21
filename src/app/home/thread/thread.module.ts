import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ThreadRoutingModule} from "./thread-routing.module";
import {ThreadComponent} from "./thread/thread.component";
import {ThreadListComponent} from "./thread-list/thread-list.component";
import {SharedModule} from "../../shared/shared.module";
import {ThreadDetailComponent} from "./thread-detail/thread-detail.component";
import {ThreadService} from "./thread.service";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ThreadRoutingModule
  ],
  declarations: [
    ThreadComponent,
    ThreadListComponent,
    ThreadDetailComponent
  ],
  providers: [ThreadService]
})
export class ThreadModule { }
