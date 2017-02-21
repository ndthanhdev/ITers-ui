import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {DataAction} from "../actions/data.action";
import {UIAction} from "../actions/ui.action";
import {TopicService} from "../../../home/topic/topic.service";
import {Observable} from "rxjs";
import {Action} from "@ngrx/store";
/**
 * Created by vunguyenhung on 2/20/17.
 */

@Injectable()
export class TopicServiceEffect {

  constructor(private actions: Actions,
              private dataAction: DataAction,
              private uiAction: UIAction,
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
}
