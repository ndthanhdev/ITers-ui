import {CommonModule} from "@angular/common";
import {ListHeaderComponent} from "./list-header/list-header.component";
import {NgModule} from "@angular/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ListFooterComponent} from "./list-footer/list-footer.component";

@NgModule({
  imports: [
    NgbModule,
    CommonModule
  ],
  declarations: [ListHeaderComponent, ListFooterComponent],
  exports: [ListHeaderComponent, ListFooterComponent]
})
export class SharedModule {
}
