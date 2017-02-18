import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/auth/auth.module#AuthModule'
  },
  // { // if path is '', redirectTo home, since there's no home yet, so we redirect it to login
  //   path: '',
  //   redirectTo: 'auth',
  //   pathMatch: 'full'
  // },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
