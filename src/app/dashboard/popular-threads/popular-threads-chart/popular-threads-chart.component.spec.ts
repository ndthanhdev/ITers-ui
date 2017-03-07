/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {PopularThreadsChartComponent} from "./popular-threads-chart.component";

describe('PopularThreadsChartComponent', () => {
  let component: PopularThreadsChartComponent;
  let fixture: ComponentFixture<PopularThreadsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularThreadsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularThreadsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
