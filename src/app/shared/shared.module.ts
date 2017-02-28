import {CommonModule} from "@angular/common";
import {ListHeaderComponent} from "./list-header/list-header.component";
import {NgModule} from "@angular/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ListFooterComponent} from "./list-footer/list-footer.component";
import {DataAction} from "./store/actions/data.action";
import {UIAction} from "./store/actions/ui.action";
import {MomentModule} from "angular2-moment";
import {AmUTCOffsetPipe} from "./pipes/amUTCOffsetPipe";

@NgModule({
  imports: [
    NgbModule,
    MomentModule,
    CommonModule
  ],
  declarations: [ListHeaderComponent, ListFooterComponent, AmUTCOffsetPipe],
  exports: [ListHeaderComponent, ListFooterComponent, MomentModule, AmUTCOffsetPipe],
  providers: [DataAction, UIAction]
})
export class SharedModule {
}
