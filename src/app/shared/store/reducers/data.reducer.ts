import {Topic} from "../../models/topic.model";
import {Action} from "@ngrx/store";
import {DataAction} from "../actions/data.action";
/**
 * Created by vunguyenhung on 2/20/17.
 */

export const initialState = {
  topics: []
};

export interface DataState {
  topics: Topic[];
}

export function reducer(state: DataState = initialState, action: Action): DataState {
  switch (action.type) {
    case DataAction.LOAD_TOPICS:
      return Object.assign({}, state, {topics: action.payload.topics});
    default:
      return state;
  }
}

