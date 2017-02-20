import {Component} from "@angular/core";
import {Router} from "@angular/router";
import "rxjs/add/operator/map";
import {PageScrollConfig} from "ng2-page-scroll";

@Component({
  selector: 'app-root',
  template: `
  <div id="app-top"></div>
  <app-navbar *ngIf="isLoginOrRegisterRoute()"></app-navbar>
  <div class="container" >
    <router-outlet></router-outlet>
  </div>
  <app-footer></app-footer>
  `,
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(private router: Router) {
    PageScrollConfig.defaultDuration = 350;
  }

  private isLoginOrRegisterRoute(): boolean {
    return this.router.routerState.snapshot.url != '/login' &&
      this.router.routerState.snapshot.url != '/register'
  }

}
