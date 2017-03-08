/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {PopularUsersChartComponent} from "./popular-users-chart.component";

describe('PopularUsersChartComponent', () => {
  let component: PopularUsersChartComponent;
  let fixture: ComponentFixture<PopularUsersChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularUsersChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularUsersChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
