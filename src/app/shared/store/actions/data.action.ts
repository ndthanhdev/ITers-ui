/**
 * Created by vunguyenhung on 2/20/17.
 */
import {Injectable} from "@angular/core";
import {Topic} from "../../models/topic.model";
import {Action} from "@ngrx/store";
import {Thread} from "../../models/thread.model";
@Injectable()
export class DataAction {
  static LOAD_TOPICS = '[DATA ACTION] LOAD_TOPICS';
  static LOAD_TOPIC = '[DATA ACTION] LOAD_TOPIC';
  static LOAD_THREAD = '[DATA ACTION] LOAD_THREAD';

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

  public loadThread(thread: Thread): Action{
    return {
      type: DataAction.LOAD_THREAD,
      payload: {thread: thread}
    }
  }

}
