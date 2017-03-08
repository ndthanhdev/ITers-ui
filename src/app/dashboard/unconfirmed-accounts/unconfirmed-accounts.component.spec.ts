/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {UnconfirmedAccountsComponent} from "./unconfirmed-accounts.component";

describe('UnconfirmedAccountsComponent', () => {
  let component: UnconfirmedAccountsComponent;
  let fixture: ComponentFixture<UnconfirmedAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnconfirmedAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnconfirmedAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
