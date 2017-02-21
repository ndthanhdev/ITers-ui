import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-topic',
  template: `
  <div class="jumbotron">
    <h1 class="display-4">ITers</h1>
    <span class="lead">Forum for TDT IT Student</span>
  </div>
  <app-topic-list></app-topic-list>
  `,
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
