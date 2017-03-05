import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {DataAction} from "../actions/data.action";
import {UIAction} from "../actions/ui.action";
import {TopicService} from "../../../home/topic/topic.service";
import {Observable} from "rxjs";
import {Action} from "@ngrx/store";
import {Response} from "@angular/http";
import {NotificationsService} from "angular2-notifications";
/**
 * Created by vunguyenhung on 2/20/17.
 */

@Injectable()
export class TopicServiceEffect {

  constructor(private actions: Actions,
              private dataAction: DataAction,
              private uiAction: UIAction,
              private notificationService: NotificationsService,
              private topicService: TopicService) {
  }

  @Effect() topicsLoad$: Observable<Action> = this.actions
    .ofType(UIAction.START_TOPICS_LOAD)
    .map(action => action.payload)
    .switchMap(payload => this.topicService.loadTopics())
    .concatMap(topics => Observable.from([
      this.dataAction.loadTopics(topics),
      this.uiAction.endTopicsLoad()
    ]));

  @Effect() topicLoad$: Observable<Action> = this.actions
    .ofType(UIAction.START_TOPIC_LOAD)
    .map(action => action.payload)
    .switchMap(payload => this.topicService.loadTopic(payload.id))
    .concatMap(topic => Observable.from([
      this.dataAction.loadTopic(topic),
      this.uiAction.endTopicLoad()
    ]));

  @Effect() topicCreate$: Observable<Action> = this.actions
    .ofType(UIAction.START_TOPIC_CREATE)
    .map(action => action.payload)
    .switchMap(payload =>
      this.topicService.createTopic(payload.topicTitle)
        .concatMap(responseMessage => {
          this.notificationService.success('SUCCESS!', responseMessage.msg);
          return Observable.from([
            this.dataAction.createTopic(responseMessage),
            this.uiAction.startTopicAdd(responseMessage.link.url)
          ])
        }))
    .catch((error: Response) => {
      let errorMessage = this.getErrorMessage(error);
      this.notificationService.error('ERROR!', errorMessage);
      return Observable.from([
        this.uiAction.createTopicFailed(),
        this.uiAction.endTopicCreate()
      ])
    });

  @Effect() topicAdd$: Observable<Action> = this.actions
    .ofType(UIAction.START_TOPIC_ADD)
    .map(action => action.payload)
    .switchMap(payload =>
      this.topicService.loadTopicByUrl(payload.url)
        .concatMap(topic => {
          return Observable.from([
            this.dataAction.addTopic(topic),
            this.uiAction.endTopicCreate()
          ])
        }));

  @Effect() topicEdit$: Observable<Action> = this.actions
    .ofType(UIAction.START_TOPIC_EDIT)
    .map(action => action.payload)
    .switchMap(payload =>
      this.topicService.editTopic(payload.topicId, payload.topicTitle)
        .concatMap(responseMessage => {
          return Observable.from([
            this.dataAction.editTopic(payload.topicId, payload.topicTitle)
          ])
        }));

  private getErrorMessage(error: Response) {
    const body = error.json().msg || '';
    if (typeof body == 'string')
      return body;

    let errorMessage: string = '';
    for (let invalidField in body)
      errorMessage += invalidField + ' is invalid!';

    console.error(errorMessage);
    return errorMessage;
  }
}
