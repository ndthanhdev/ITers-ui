import * as fromData from "./data.reducer";
import {DataState} from "./data.reducer";
import * as fromUI from "./ui.reducer";
import {UIState} from "./ui.reducer";
/**
 * Created by vunguyenhung on 2/20/17.
 */
export interface AppState {
  uiState: UIState,
  dataState: DataState
}

export const initialState = {
  uiState: fromUI.initialState,
  dataState: fromData.initialState
};

export const reducer = {
  uiState: fromUI.reducer,
  dataState: fromData.reducer
};
