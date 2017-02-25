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

  static START_THREAD_LOAD = '[UI ACTION] START_THREAD_LOAD';
  static END_THREAD_LOAD = '[UI ACTION] END_THREAD_LOAD';

  static START_USER_LOAD = '[UI ACTION] START_USER_LOAD';
  static END_USER_LOAD = '[UI ACTION] END_USER_LOAD';

  static START_LOGIN = '[UI ACTION] START_LOGIN';
  static END_LOGIN = '[UI ACTION] END_LOGIN';

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

  public startThreadLoad(topicId: number, threadId: number): Action {
    return {
      type: UIAction.START_THREAD_LOAD, payload: {
        topicId: topicId,
        threadId: threadId
      }
    }
  }

  public endThreadLoad(): Action {
    return {type: UIAction.END_THREAD_LOAD}
  }

  public startUserLoad(userId: number): Action {
    return {
      type: UIAction.START_USER_LOAD,
      payload: {id: userId}
    }
  }

  public endUserLoad(): Action {
    return {type: UIAction.END_USER_LOAD}
  }

  public startLogin(school_id: string, password: string): Action {
    return {
      type: UIAction.START_LOGIN,
      payload: {
        school_id: school_id,
        password: password
      }
    }
  }

  public endLogin(): Action {
    return {type: UIAction.END_LOGIN}
  }
}
