import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AuthRoutingModule} from "./auth-routing.module";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule {
}
