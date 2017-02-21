/**
 * Created by vunguyenhung on 2/20/17.
 */
import {Injectable} from "@angular/core";
import {Action} from "@ngrx/store";
@Injectable()
export class UIAction {
  static START_TOPICS_LOAD = '[UI ACTION] START_TOPICS_LOAD';
  static END_TOPICS_LOAD = '[UI ACTION] END_TOPICS_LOAD';
  static START_TOPIC_LOAD = '[UI ACTION] START_TOPIC_LOAD';
  static END_TOPIC_LOAD = '[UI ACTION] END_TOPIC_LOAD';

  public startTopicsLoad(): Action {
    return {type: UIAction.START_TOPICS_LOAD}
  }

  public endTopicsLoad(): Action {
    return {type: UIAction.END_TOPICS_LOAD}
  }

  public startTopicLoad(topicId: number): Action {
    return {
      type: UIAction.START_TOPIC_LOAD,
      payload: {id: topicId}
    }
  }

  public endTopicLoad(): Action {
    return {type: UIAction.END_TOPIC_LOAD}
  }
}
