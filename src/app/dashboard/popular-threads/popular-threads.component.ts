import {Component, Input, OnChanges} from "@angular/core";
import {Thread} from "../../shared/models/thread.model";


@Component({
  selector: 'app-popular-threads',
  template: `
  <div class="card mb-3">
    <div class="card-header">
      <span class="lead">Popular Threads</span>
    </div>
    <div class="card-block">
      <div class="d-flex justify-content-center">
         <i class="fa fa-spinner fa-pulse fa-fw fa-2x" *ngIf="loadingPopularThread"></i>
      </div>
      <app-popular-threads-chart
        [popularThreads]="sortedPopularThreads">
      </app-popular-threads-chart>
    </div>
  </div>
  `,
  styleUrls: ['./popular-threads.component.scss']
})
export class PopularThreadsComponent implements OnChanges {
  @Input() popularThreads: Thread[];
  @Input() loadingPopularThread: boolean;

  private sortedPopularThreads: Thread[];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.sortedPopularThreads = this.sortByLikeAndDislike(this.popularThreads, 10);
  }

  private sortByLikeAndDislike(threads: Thread[], limit: number): Thread[] {
    if (threads.length < 0) return [];
    return threads.sort((a: Thread, b: Thread) => {
      return (a.likes + a.dislikes) - (b.likes + b.dislikes)
    }).slice(threads.length - limit - 1, threads.length - 1);
  }

}
