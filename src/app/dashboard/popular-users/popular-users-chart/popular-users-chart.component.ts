import {Component, OnInit, Input, OnChanges} from "@angular/core";
import {User} from "../../../shared/models/user.model";

@Component({
  selector: 'app-popular-users-chart',
  template: `
  <div id="popular-users-chart"></div>
  `,
  styleUrls: ['./popular-users-chart.component.scss']
})
export class PopularUsersChartComponent implements OnInit , OnChanges{
  @Input() popularUsers: User[];

  private wrapper: google.visualization.ChartWrapper = null;
  protected dataTable: google.visualization.DataTable;
  protected options: any = {
    isStacked: true,
    hAxis: {title: 'User'},
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

  constructor() { }

  ngOnChanges(): void {
    if (this.popularUsers.length > 0 && this.wrapper) {
      this.dataTable = this.prepareDataTable(this.popularUsers);
      this.wrapper.setDataTable(this.dataTable);
      this.wrapper.draw();
    }
  }

  ngOnInit() {
    this.initializeWrapper({
      chartType: 'ColumnChart',
      options: this.options,
      containerId: 'popular-users-chart'
    })
  }


  private initializeWrapper(chartSpec: google.visualization.ChartSpecs): void {
    if (google.visualization)
      this.wrapper = new google.visualization.ChartWrapper(chartSpec);
  }

  private prepareDataTable(popularUsers: User[]): google.visualization.DataTable {
    let dataTable: google.visualization.DataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Thread');
    dataTable.addColumn('number', 'Likes');
    dataTable.addColumn('number', 'Dislikes');
    dataTable.addColumn({ type: 'number', role: 'annotation' });

    popularUsers.forEach(user => {
      dataTable.addRow([
        user.full_name,
        user.likes,
        user.dislikes,
        user.likes + user.dislikes
      ])
    });

    return dataTable;
  }
}
