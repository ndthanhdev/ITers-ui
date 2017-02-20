import {Thread} from "./thread.model";
/**
 * Created by vunguyenhung on 2/20/17.
 */
export interface TopicInterface {
  id: number;
  title: string;
  threads_count: number;
  posts_count: number;
  latest_threads: Thread[];
  created_at: Date;
  updated_at: Date
}

export class Topic implements TopicInterface {
  id: number;
  title: string;
  created_at: Date;
  updated_at: Date;
  threads_count: number;
  posts_count: number;
  latest_threads: Thread[];

  public constructor(that: TopicInterface) {
    this.id = that.id;
    this.title = that.title;
    this.created_at = that.created_at;
    this.updated_at = that.updated_at;
    this.threads_count = that.threads_count;
    this.posts_count = that.posts_count;
    this.latest_threads = that.latest_threads;
  }
}
