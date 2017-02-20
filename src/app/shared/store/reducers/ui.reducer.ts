import {Action} from "@ngrx/store";
import {UIAction} from "../actions/ui.action";
/**
 * Created by vunguyenhung on 2/20/17.
 */

export const initialState: UIState = {
  loadingTopics: false
};

export interface UIState {
  loadingTopics: boolean
}

export function reducer(state: UIState = initialState, action: Action): UIState {
  switch (action.type) {
    case UIAction.START_TOPICS_LOAD:
      return Object.assign({}, state, {loadingTopics: true});

    case UIAction.END_TOPICS_LOAD:
      return Object.assign({}, state, {loadingTopics: false});

    default:
      return state;
  }
}
