/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RecentAccountsComponent} from "./recent-accounts.component";

describe('RecentAccountsComponent', () => {
  let component: RecentAccountsComponent;
  let fixture: ComponentFixture<RecentAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
