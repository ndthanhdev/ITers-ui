import {Component} from "@angular/core";

@Component({
  selector: 'app-root',
  template: `
  <app-navbar></app-navbar>
  <div class="container">
    <router-outlet></router-outlet>
  </div>
  <app-footer></app-footer>
  `,
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  title = 'app works!';
}
