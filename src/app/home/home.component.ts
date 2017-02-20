import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-home',
  template: `
  <div class="jumbotron">
    <h1 class="display-4">ITers</h1>
    <span class="lead">Forum for TDT IT Student</span>
  </div>
  <app-topic-list></app-topic-list>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private currentPage: number = 1;


  constructor() {
  }

  ngOnInit() {
  }

  private onPageChange($event) {
    this.currentPage = $event;
  }

}
