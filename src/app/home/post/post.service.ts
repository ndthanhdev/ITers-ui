import {Injectable, Injector} from "@angular/core";
import {GenericService} from "../../shared/services/generic.service";
import {Observable} from "rxjs";
import {ResponseMessage} from "../../shared/models/response-message.model";
import {RequestOptions, Response} from "@angular/http";
import {Post} from "../../shared/models/post.model";

@Injectable()
export class PostService extends GenericService {

  constructor(injector: Injector) {
    super(injector);
    this.BASE_URL += '/topics';
  }

  public createPost(topicId: number, threadId: number, postContent: string): Observable<ResponseMessage> {
    return this.postWithAuth(new RequestOptions({url: `${this.BASE_URL}/${topicId}/threads/${threadId}/posts`}), {
      content: postContent
    }).map(this.extractResponseMessage);
  }

  public loadPost(url: string): Observable<Post> {
    return this.get(new RequestOptions({
      url: url
    }));
  }

  public votePost(postId: number, liked: boolean): Observable<ResponseMessage> {
    return this.putWithAuth(new RequestOptions({
      url: `http://homestead.app/api/posts/${postId}/vote`
    }), {
      liked: liked
    }).map(this.extractResponseMessage);
  }

  public editPost(topicId: number, threadId: number, postId: number, postContent: string) {
    return this.patchWithAuth(new RequestOptions({url: `${this.BASE_URL}/${topicId}/threads/${threadId}/posts/${postId}`}), {
      content: postContent
    }).map(this.extractResponseMessage);
  }

  private extractResponseMessage(resp: Response): ResponseMessage {
    return new ResponseMessage(resp.json());
  }

  protected extractData(resp: Response): Post {
    return new Post(resp.json());
  }


}
