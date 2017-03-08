import {AccountInterface, Account} from "./account.model";
import {TopicInterface, Topic} from "./topic.model";
/**
 * Created by vunguyenhung on 2/20/17.
 */
export interface UserInterface {
  id?: number;
  full_name?: string;
  start_year?: number;
  email?: string;
  birthday?: Date;
  account?: AccountInterface;
  pivot?: {
    post_id: number,
    user_id: number,
    liked: boolean
  }
  topics?: TopicInterface[];
  likes?: number;
  dislikes?: number;
}

export class User implements UserInterface {
  id: number;
  full_name: string;
  start_year: number;
  email: string;
  birthday: Date;
  pivot: {post_id: number; user_id: number; liked: boolean};
  account: Account;
  topics: Topic[] = [];
  likes: number = 0;
  dislikes: number = 0;

  public constructor(that: UserInterface) {
    this.id = that.id;
    this.full_name = that.full_name;
    this.start_year = that.start_year;
    this.email = that.email;
    this.pivot = that.pivot;
    this.likes = that.likes;
    this.dislikes = that.dislikes;
    if (that.birthday)
      this.birthday = new Date(that.birthday);
    if (that.account)
      this.account = new Account(that.account);
    if (that.topics)
      that.topics.forEach(topic => this.topics.push(new Topic(topic)));
  }

}
