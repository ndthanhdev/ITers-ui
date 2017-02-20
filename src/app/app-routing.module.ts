import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {NotFoundComponent} from "./core/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/auth/auth.module#AuthModule'
  },
  {
    path: 'home',
    loadChildren: 'app/home/home.module#HomeModule'
  },
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
