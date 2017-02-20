import {User, UserInterface} from "./user.model";
/**
 * Created by vunguyenhung on 2/20/17.
 */
export interface ThreadInterface {
  id: number;
  title: string;
  user: UserInterface;
  topic_id: number;
  created_at: Date;
  updated_at: Date;

}


export class Thread implements ThreadInterface {
  id: number;
  topic_id: number;
  created_at: Date;
  updated_at: Date;
  title: string;
  user: User;

  public constructor(that: ThreadInterface) {
    this.id = that.id;
    this.topic_id = that.topic_id;
    this.created_at = that.created_at;
    this.updated_at = that.updated_at;
    this.title = that.title;
    this.user = new User(that.user);
  }
}
