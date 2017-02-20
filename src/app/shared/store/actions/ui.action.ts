/**
 * Created by vunguyenhung on 2/20/17.
 */
import {Injectable} from "@angular/core";
import {Action} from "@ngrx/store";
@Injectable()
export class UIAction {
  static START_TOPICS_LOAD = '[UI ACTION] START_TOPICS_LOAD';
  static END_TOPICS_LOAD = '[UI ACTION] END_TOPICS_LOAD';

  public startTopicsLoad(): Action {
    return {type: UIAction.START_TOPICS_LOAD}
  }

  public endTopicsLoad(): Action {
    return {type: UIAction.END_TOPICS_LOAD}
  }
}
