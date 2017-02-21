import {Injectable, Injector} from "@angular/core";
import {Observable} from "rxjs";
import {Response, RequestOptions} from "@angular/http";
import {GenericService} from "../../shared/services/generic.service";
import {Topic, TopicInterface} from "../../shared/models/topic.model";

@Injectable()
export class TopicService extends GenericService {

  constructor(injector: Injector) {
    super(injector);
    this.BASE_URL += '/topics';
  }

  public loadTopics(): Observable<Topic[]> {
    return this.getList();
  }

  public loadTopic(topicId : number): Observable<Topic>{
    return this.get(new RequestOptions({
      url: this.BASE_URL + '/' + topicId
    }));
  }

  protected extractDataList(resp: Response): Topic[] {
    let objectBasedData: Topic[] = [];
    let responseBasedData: TopicInterface[] = JSON.parse(resp.text());
    responseBasedData.forEach(data => objectBasedData.push(new Topic(data)));
    return objectBasedData;
  }

  protected extractData(resp: Response) : Topic {
    return new Topic(resp.json());
  }

}
