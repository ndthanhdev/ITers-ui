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
  static LOGIN_FAILED = '[UI ACTION] LOGIN_FAILED';

  static START_REGISTER = '[UI ACTION] START_REGISTER';
  static REGISTER_FAILED = '[UI ACTION] REGISTER_FAILED';
  static END_REGISTER = '[UI ACTION] END_REGISTER';

  static START_POST_CREATE = '[UI ACTION] START_POST_CREATE';
  static END_POST_CREATE = '[UI ACTION] END_POST_CREATE';
  static CREATE_POST_FAILED = '[UI ACTION] CREATE_POST_FAILED';

  static START_POST_ADD = '[UI ACTION] START_POST_ADD';

  static START_POST_VOTE = '[UI ACTION] START_POST_VOTE';

  static START_POST_EDIT = '[UI ACTION] START_POST_EDIT';

  static START_THREAD_CREATE = '[UI ACTION] START_THREAD_CREATE';
  static END_THREAD_CREATE = '[UI ACTION] END_THREAD_CREATE';

  static START_THREAD_ADD = '[UI ACTION] START_THREAD_ADD';
  static CREATE_THREAD_FAILED = '[UI ACTION] CREATE_THREAD_FAILED';

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

  public startRegister(user, account): Action {
    return {
      type: UIAction.START_REGISTER,
      payload: {
        user: user,
        account: account
      }
    }
  }

  public endRegister(): Action {
    return {type: UIAction.END_REGISTER}
  }

  public registerFailed(): Action {
    return {type: UIAction.REGISTER_FAILED}
  }

  public loginFailed(): Action {
    return {type: UIAction.LOGIN_FAILED}
  }

  public startPostCreate(topicId: number, threadId: number, postContent: string): Action {
    return {
      type: UIAction.START_POST_CREATE,
      payload: {
        topicId: topicId,
        threadId: threadId,
        postContent: postContent
      }
    }
  }

  public endPostCreate(): Action {
    return {type: UIAction.END_POST_CREATE}
  }

  public createPostFailed() {
    return {type: UIAction.CREATE_POST_FAILED}
  }

  public startPostAdd(url: string) {
    return {type: UIAction.START_POST_ADD, payload: {url: url}}
  }

  public startPostVote(postId: number, liked: boolean) {
    return {
      type: UIAction.START_POST_VOTE,
      payload: {postId: postId, liked: liked}
    }
  }

  public startPostEdit(topicId: number, threadId: number, postId: number, postContent: string) {
    return {
      type: UIAction.START_POST_EDIT,
      payload: {
        topicId: topicId,
        threadId: threadId,
        postId: postId,
        postContent: postContent
      }
    }
  }

  public startThreadCreate(threadTitle: string, postContent: string, topicId: number) {
    return {
      type: UIAction.START_THREAD_CREATE,
      payload: {
        threadTitle: threadTitle,
        postContent: postContent,
        topicId: topicId
      }
    }
  }

  public endThreadCreate(): Action {
    return {type: UIAction.END_THREAD_CREATE}
  }

  public startThreadAdd(topicId: number, threadId: number): Action {
    return {type: UIAction.START_THREAD_ADD, payload: {topicId: topicId, threadId: threadId}}
  }

  public createThreadFailed(): Action {
    return {type: UIAction.CREATE_THREAD_FAILED}
  }

}
