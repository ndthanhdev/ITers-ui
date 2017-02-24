import {Component, OnInit} from "@angular/core";

@Component({
  template: `
  <div class="aligner">
    <h1 class="display-1">Oops!</h1>
    <span class="lead">We can't seem to find the page you're looking for.</span>
  </div>
  `,
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
