import {User, UserInterface} from "./user.model";
import {PostInterface, Post} from "./post.model";
/**
 * Created by vunguyenhung on 2/20/17.
 */
export interface ThreadInterface {
  id?: number;
  title?: string;
  user?: UserInterface;
  topic_id?: number;
  created_at?: Date;
  updated_at?: Date;
  latest_posts?: PostInterface[];
  oldest_posts?: PostInterface[];
  likes?: number;
  dislikes?: number;
}

export class Thread implements ThreadInterface {
  id?: number;
  topic_id?: number;
  created_at?: Date;
  updated_at?: Date;
  title?: string;
  user?: User;
  latest_posts?: Post[] = [];
  oldest_posts?: Post[] = [];
  likes?: number = 0;
  dislikes?: number = 0;

  public constructor(that: ThreadInterface) {
    this.id = that.id;
    this.topic_id = that.topic_id;
    this.created_at = that.created_at;
    this.updated_at = that.updated_at;
    this.title = that.title;
    this.likes = that.likes;
    this.dislikes = that.dislikes;
    if (that.user)
      this.user = new User(that.user);
    if (that.latest_posts)
      that.latest_posts.forEach(post => this.latest_posts.push(new Post(post)));
    if (that.oldest_posts)
      that.oldest_posts.forEach(post => this.oldest_posts.push(new Post(post)));
  }
}
