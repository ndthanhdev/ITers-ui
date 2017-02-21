import {Action} from "@ngrx/store";
import {UIAction} from "../actions/ui.action";
/**
 * Created by vunguyenhung on 2/20/17.
 */

export const initialState: UIState = {
  loadingTopics: false,
  loadingTopic: false
};

export interface UIState {
  loadingTopics: boolean
  loadingTopic: boolean
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

    default:
      return state;
  }
}
