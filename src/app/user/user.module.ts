import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UserRoutingModule} from "./user-routing.module";
import {UserComponent} from "./user/user.component";
import {UserService} from "./user.service";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    FormsModule,
    UserRoutingModule,
  ],
  declarations: [UserComponent],
  providers: [UserService]
})
export class UserModule { }
