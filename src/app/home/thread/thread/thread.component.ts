import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-thread',
  template: `
  <div class="jumbotron">
    <h1 class="display-4">ITers</h1>
    <span class="lead">Forum for TDT IT Student</span>
  </div>
  `,
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {
  // get data from service here
  constructor() {
  }

  ngOnInit() {
  }

}
