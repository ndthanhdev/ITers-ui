import {Action} from "@ngrx/store";
import {UIAction} from "../actions/ui.action";
/**
 * Created by vunguyenhung on 2/20/17.
 */

export const initialState: UIState = {
  loadingTopics: false,
  loadingTopic: false,
  loadingThread: false,
  loadingUser: false,
  loggingIn : false,
  registering: false,
  creatingPost: false,
  creatingThread: false,
  syncingUserTopic: false
};

export interface UIState {
  loadingTopics: boolean;
  loadingTopic: boolean;
  loadingThread: boolean;
  loadingUser: boolean;
  loggingIn : boolean;
  registering: boolean;
  creatingPost: boolean;
  creatingThread: boolean;
  syncingUserTopic: boolean;
}

export function reducer(state: UIState = initialState, action: Action): UIState {
  switch (action.type) {
    case UIAction.START_TOPICS_LOAD:
      return Object.assign({}, state, {loadingTopics: true});

    case UIAction.END_TOPICS_LOAD:
      return Object.assign({}, state, {loadingTopics: false});

    case UIAction.START_TOPIC_LOAD:
      return Object.assign({}, state, {loadingTopic: true});

    case UIAction.END_TOPIC_LOAD:
      return Object.assign({}, state, {loadingTopic: false});

    case UIAction.START_THREAD_LOAD:
      return Object.assign({}, state, {loadingThread: true});

    case UIAction.END_THREAD_LOAD:
      return Object.assign({}, state, {loadingThread: false});

    case UIAction.START_USER_LOAD:
      return Object.assign({}, state, {loadingUser: true});

    case UIAction.END_USER_LOAD:
      return Object.assign({}, state, {loadingUser: false});

    case UIAction.START_LOGIN:
      return Object.assign({}, state, {loggingIn: true});

    case UIAction.END_LOGIN:
      return Object.assign({}, state, {loggingIn: false});

    case UIAction.START_REGISTER:
      return Object.assign({}, state, {registering: true});

    case UIAction.END_REGISTER:
      return Object.assign({}, state, {registering: false});

    case UIAction.START_POST_CREATE:
      return Object.assign({}, state, {creatingPost : true});

    case UIAction.END_POST_CREATE:
      return Object.assign({}, state, {creatingPost : false});

    case UIAction.START_THREAD_CREATE:
      return Object.assign({}, state, {creatingThread : true});

    case UIAction.END_THREAD_CREATE:
      return Object.assign({}, state, {creatingThread : false});

    case UIAction.START_ROLE_UPDATE:
      return Object.assign({}, state, {syncingUserTopic: true});

    case UIAction.END_USER_TOPIC_SYNC:
      return Object.assign({}, state, {syncingUserTopic: false});

    default:
      return state;
  }
}
