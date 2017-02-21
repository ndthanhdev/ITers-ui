import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ThreadRoutingModule} from "./thread-routing.module";
import {ThreadComponent} from "./thread/thread.component";

@NgModule({
  imports: [
    CommonModule,
    ThreadRoutingModule
  ],
  declarations: [ThreadComponent]
})
export class ThreadModule {
}
