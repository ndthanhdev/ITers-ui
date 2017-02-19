import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NotFoundComponent} from "./not-found/not-found.component";
import {CoreRoutingModule} from "./core-routing.module";
import {NavbarComponent} from "./navbar/navbar.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FooterComponent} from "./footer/footer.component";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    CoreRoutingModule
  ],
  declarations: [NotFoundComponent, NavbarComponent, FooterComponent],
  exports: [NotFoundComponent, NavbarComponent, FooterComponent]
})
export class CoreModule {
}
