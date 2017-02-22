import {Injectable, Injector} from "@angular/core";
import {GenericService} from "../../shared/services/generic.service";
import {Observable} from "rxjs";
import {Thread} from "../../shared/models/thread.model";
import {RequestOptions, Response} from "@angular/http";

@Injectable()
export class ThreadService extends GenericService {

  constructor(injector: Injector) {
    super(injector);
    this.BASE_URL += '/topics';
  }

  public loadThread(topicId: number, threadId: number): Observable<Thread> {
    return this.get(new RequestOptions({
      url: `${this.BASE_URL}/${topicId}/threads/${threadId}`
    }))
  }

  protected extractData(resp: Response) : Thread {
    return new Thread(resp.json());
  }
}
