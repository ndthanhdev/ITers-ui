/**
 * Created by vunguyenhung on 2/20/17.
 */
import {Injectable} from "@angular/core";
import {Topic} from "../../models/topic.model";
import {Action} from "@ngrx/store";
@Injectable()
export class DataAction {
  static LOAD_TOPICS = '[DATA ACTION] LOAD_TOPICS';
  static LOAD_TOPIC = '[DATA ACTION] LOAD_TOPIC';

  public loadTopics(topics: Topic[]): Action {
    return {
      type: DataAction.LOAD_TOPICS,
      payload: {topics: topics}
    }
  }

  public loadTopic(topic: Topic): Action {
    return {
      type: DataAction.LOAD_TOPIC,
      payload: {topic: topic}
    }
  }

}
