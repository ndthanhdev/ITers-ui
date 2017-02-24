import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UserRoutingModule} from "./user-routing.module";
import {UserComponent} from "./user/user.component";
import {UserService} from "./user.service";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
  ],
  declarations: [UserComponent],
  providers: [UserService]
})
export class UserModule { }
