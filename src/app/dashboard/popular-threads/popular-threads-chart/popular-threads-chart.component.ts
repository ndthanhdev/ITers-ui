import {Component, OnInit, Input, AfterViewInit, OnChanges} from "@angular/core";
import {Thread} from "../../../shared/models/thread.model";


@Component({
  selector: 'app-popular-threads-chart',
  template: `
  <div id="popular-threads-chart"></div>
  `,
  styleUrls: ['./popular-threads-chart.component.scss']
})
export class PopularThreadsChartComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() popularThreads: Thread[];

  private wrapper: google.visualization.ChartWrapper = null;
  protected dataTable: google.visualization.DataTable;
  protected options: any = {
    isStacked: true,
    hAxis: {title: 'Thread'},
    vAxis: {title: 'Likes + Dislikes'},
    legend: {position: 'top', maxLines: 3},
    animation: {
      startup: true,
      easing: 'inAndOut',
      duration: 1000
    },
    chartArea: {
      width: '90%',
      height: '60%'
    }
  };

  constructor() {
  }

  ngOnChanges(): void {
    if (this.popularThreads.length > 0 && this.wrapper) {
      this.dataTable = this.prepareDataTable(this.popularThreads);
      this.wrapper.setDataTable(this.dataTable);
      this.wrapper.draw();
    }
  }

  ngOnInit() {
    this.initializeWrapper({
      chartType: 'ColumnChart',
      options: this.options,
      containerId: 'popular-threads-chart'
    })
  }

  ngAfterViewInit(): void {

  }

  private initializeWrapper(chartSpec: google.visualization.ChartSpecs): void {
    if (google.visualization)
      this.wrapper = new google.visualization.ChartWrapper(chartSpec);
  }

  private prepareDataTable(popularThread: Thread[]): google.visualization.DataTable {
    let dataTable: google.visualization.DataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Thread');
    dataTable.addColumn('number', 'Likes');
    dataTable.addColumn('number', 'Dislikes');
    dataTable.addColumn({ type: 'number', role: 'annotation' });

    popularThread.forEach(thread => {
      dataTable.addRow([
        thread.title,
        thread.likes,
        thread.dislikes,
        thread.likes + thread.dislikes
      ])
    });

    return dataTable;
  }

}
