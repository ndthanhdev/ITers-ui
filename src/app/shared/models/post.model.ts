import {UserInterface, User} from "./user.model";
/**
 * Created by vunguyenhung on 2/21/17.
 */

export interface PostInterface{
  id: number;
  content: string;
  confirmed: boolean;
  user: UserInterface;
  thread_id: number;
  created_at: Date;
  updated_at: Date;
}

export class Post implements PostInterface{
  id: number;
  content: string;
  confirmed: boolean;
  user: User;
  thread_id: number;
  created_at: Date;
  updated_at: Date;

  public constructor(that : PostInterface){
    this.id = that.id;
    this.content = that.content;
    this.confirmed = that.confirmed;
    this.user = new User(that.user);
    this.thread_id = that.thread_id;
    this.created_at = that.created_at;
    this.updated_at = that.updated_at;
  }

}
