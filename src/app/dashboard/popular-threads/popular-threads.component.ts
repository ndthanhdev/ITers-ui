import {Component, OnInit, Input} from "@angular/core";
import {Thread} from "../../shared/models/thread.model";

@Component({
  selector: 'app-popular-threads',
  template: `
  <div class="card">
    <div class="card-header">
      Popular Threads
    </div>
    <div class="card-block">
      <!--TODO: google column chart here-->
    </div>
  </div>
  `,
  styleUrls: ['./popular-threads.component.scss']
})
export class PopularThreadsComponent implements OnInit {
  @Input() popularThreads: Thread[];

  constructor() { }

  ngOnInit() {
  }

}
