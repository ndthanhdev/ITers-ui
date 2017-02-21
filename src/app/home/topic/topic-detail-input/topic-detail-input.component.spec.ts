/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TopicDetailInputComponent} from "./topic-detail-input.component";

describe('TopicDetailInputComponent', () => {
  let component: TopicDetailInputComponent;
  let fixture: ComponentFixture<TopicDetailInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopicDetailInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicDetailInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
