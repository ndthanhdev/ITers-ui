import {Topic} from "../../models/topic.model";
import {Action} from "@ngrx/store";
import {DataAction} from "../actions/data.action";
import {Thread} from "../../models/thread.model";
import {User} from "../../models/user.model";
/**
 * Created by vunguyenhung on 2/20/17.
 */

export const initialState = {
  topics: [],
  topic: null,
  thread: null,
  user: null
};

export interface DataState {
  topics: Topic[];
  topic: Topic;
  thread: Thread;
  user: User
}

export function reducer(state: DataState = initialState, action: Action): DataState {
  switch (action.type) {
    case DataAction.LOAD_TOPICS:
      return Object.assign({}, state, {topics: action.payload.topics});

    case DataAction.LOAD_TOPIC:
      return Object.assign({}, state, {topic: action.payload.topic});

    case DataAction.LOAD_THREAD:
      return Object.assign({}, state, {thread: action.payload.thread});

    case DataAction.LOAD_USER:
      return Object.assign({}, state, {user: action.payload.user});

    default:
      return state;
  }
}

