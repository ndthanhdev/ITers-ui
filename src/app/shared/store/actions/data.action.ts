/**
 * Created by vunguyenhung on 2/20/17.
 */
import {Injectable} from "@angular/core";
import {Topic} from "../../models/topic.model";
import {Action} from "@ngrx/store";
import {Thread} from "../../models/thread.model";
import {User} from "../../models/user.model";
import {Account} from "../../models/account.model";
import {ResponseMessage} from "../../models/response-message.model";
import {Post} from "../../models/post.model";
@Injectable()
export class DataAction {
  static LOAD_TOPICS = '[DATA ACTION] LOAD_TOPICS';
  static LOAD_TOPIC = '[DATA ACTION] LOAD_TOPIC';
  static LOAD_THREAD = '[DATA ACTION] LOAD_THREAD';

  static LOAD_USER = '[DATA ACTION] LOAD_USER';

  static LOGIN = '[DATA ACTION] LOGIN';
  static LOGOUT = '[DATA ACTION] LOGOUT';

  static REGISTER = '[DATA ACTION] REGISTER';

  static CREATE_POST = '[DATA ACTION] CREATE POST';
  static ADD_POST = '[DATA ACTION] ADD POST';

  static VOTE_POST = '[DATA ACTION] VOTE POST';
  static ADD_VOTE_POST = '[DATA ACTION] ADD VOTE POST';

  static EDIT_POST = '[DATA ACTION] EDIT POST';
  static ADD_EDIT_POST = '[DATA ACTION] ADD EDIT POST';

  static CREATE_THREAD = '[DATA ACTION] CREATE THREAD';
  static ADD_THREAD = '[DATA ACTION] ADD THREAD';

  static EDIT_USER = '[DATA ACTION] EDIT_USER';
  static ADD_EDIT_USER = '[DATA ACTION] ADD_EDIT_USER';

  static UPDATE_ROLE = '[DATA ACTION] UPDATE_ROLE';
  static SYNC_USER_TOPIC = '[DATA ACTION] SYNC_USER_TOPIC';

  static CHANGE_POST_STATE = '[DATA ACTION] CHANGE_POST_STATE';

  static CONFIRM_ACCOUNT = '[DATA ACTION] CONFIRM_ACCOUNT';

  static CREATE_TOPIC = '[DATA ACTION] CREATE_TOPIC';

  static ADD_TOPIC = '[DATA ACTION] ADD_TOPIC';

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

  public loadThread(thread: Thread): Action {
    return {
      type: DataAction.LOAD_THREAD,
      payload: {thread: thread}
    }
  }

  public loadUser(user: User): Action {
    return {
      type: DataAction.LOAD_USER,
      payload: {user: user}
    }
  }

  public login(loggedInAccount: Account): Action {
    return {
      type: DataAction.LOGIN,
      payload: {loggedInAccount: loggedInAccount}
    }
  }

  public logout(): Action {
    return {type: DataAction.LOGOUT}
  }

  public register(msg): Action {
    return {
      type: DataAction.REGISTER,
      payload: {msg: msg}
    }
  }

  public createPost(responseMessage: ResponseMessage): Action {
    return {
      type: DataAction.CREATE_POST,
      payload: {responseMessage: responseMessage}
    }
  }

  public addPost(post: Post): Action {
    return {
      type: DataAction.ADD_POST,
      payload: {post: post}
    }
  }

  public votePost(responseMessage: ResponseMessage): Action {
    return {
      type: DataAction.VOTE_POST,
      payload: {responseMessage: responseMessage}
    }
  }

  public addVotePost(postId: number, liked: boolean, loggedInAccount: Account): Action {
    return {
      type: DataAction.ADD_VOTE_POST,
      payload: {postId: postId, liked: liked, loggedInAccount: loggedInAccount}
    }
  }

  public editPost(responseMessage: ResponseMessage): Action {
    return {
      type: DataAction.EDIT_POST,
      payload: {responseMessage: responseMessage}
    }
  }

  public addEditPost(postId: number, postContent: string) {
    return {
      type: DataAction.ADD_EDIT_POST,
      payload: {postId: postId, postContent: postContent}
    }
  }

  public createThread(responseMessage: ResponseMessage) {
    return {
      type: DataAction.CREATE_THREAD,
      payload: {responseMessage: responseMessage}
    }
  }

  public addThread(thread: Thread, loggedInAccount): Action {
    return {
      type: DataAction.ADD_THREAD,
      payload: {thread: thread, loggedInAccount: loggedInAccount}
    }
  }

  public editUser(responseMessage: ResponseMessage): Action {
    return {
      type: DataAction.EDIT_USER,
      payload: {responseMessage: responseMessage}
    }
  }

  public addEditUser(user: User): Action {
    return {
      type: DataAction.ADD_EDIT_USER,
      payload: {user: user}
    }
  }

  public updateRole(privilege_level: number): Action {
    return {
      type: DataAction.UPDATE_ROLE,
      payload: {privilege_level: privilege_level}
    }
  }

  public syncUserTopic(topics: number[]): Action {
    return {
      type: DataAction.SYNC_USER_TOPIC,
      payload: {topics: topics}
    }
  }


  public changePostState(postId: number, confirmation: boolean) {
    return {
      type: DataAction.CHANGE_POST_STATE,
      payload: {postId: postId, confirmation: confirmation}
    }
  }

  public confirmAccount(responseMessage: ResponseMessage){
    return {
      type: DataAction.CONFIRM_ACCOUNT,
      payload: {responseMessage: responseMessage}
    }
  }

  public createTopic(responseMessage: ResponseMessage){
    return {
      type: DataAction.CREATE_TOPIC,
      payload: {responseMessage: responseMessage}
    }
  }

  public addTopic(topic: Topic): Action{
    return {
      type: DataAction.ADD_TOPIC,
      payload: {topic: topic}
    }
  }
}
