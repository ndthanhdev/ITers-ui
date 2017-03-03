import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ThreadRoutingModule} from "./thread-routing.module";
import {ThreadComponent} from "./thread/thread.component";
import {ThreadListComponent} from "./thread-list/thread-list.component";
import {SharedModule} from "../../shared/shared.module";
import {ThreadDetailComponent} from "./thread-detail/thread-detail.component";
import {ThreadService} from "./thread.service";
import {ThreadDetailInputComponent} from "./thread-detail-input/thread-detail-input.component";
import {FroalaEditorModule} from "angular2-froala-wysiwyg";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    FroalaEditorModule,
    ThreadRoutingModule
  ],
  declarations: [
    ThreadComponent,
    ThreadListComponent,
    ThreadDetailComponent,
    ThreadDetailInputComponent
  ],
  providers: [ThreadService]
})
export class ThreadModule { }
