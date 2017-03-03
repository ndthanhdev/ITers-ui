import {Injectable, Injector} from "@angular/core";
import {GenericService} from "../../shared/services/generic.service";
import {Observable} from "rxjs";
import {Thread} from "../../shared/models/thread.model";
import {RequestOptions, Response} from "@angular/http";
import {ResponseMessage} from "../../shared/models/response-message.model";

@Injectable()
export class ThreadService extends GenericService {

  constructor(injector: Injector) {
    super(injector);
    this.BASE_URL += '/topics';
  }

  public createThread(threadTitle: string, topicId: number) {
    return this.postWithAuth(new RequestOptions({url: `${this.BASE_URL}/${topicId}/threads`}), {
      title: threadTitle
    }).map(this.extractResponseMessage)
  }

  public loadThread(topicId: number, threadId: number): Observable<Thread> {
    return this.get(new RequestOptions({
      url: `${this.BASE_URL}/${topicId}/threads/${threadId}`
    }))
  }

  private extractResponseMessage(resp: Response): ResponseMessage {
    return new ResponseMessage(resp.json());
  }

  protected extractData(resp: Response): Thread {
    return new Thread(resp.json());
  }
}
