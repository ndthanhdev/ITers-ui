import {Injectable, Injector} from "@angular/core";
import {Observable} from "rxjs";
import {Response, RequestOptions} from "@angular/http";
import {GenericService} from "../../shared/services/generic.service";
import {Topic, TopicInterface} from "../../shared/models/topic.model";
import {ResponseMessage} from "../../shared/models/response-message.model";

@Injectable()
export class TopicService extends GenericService {

  constructor(injector: Injector) {
    super(injector);
    this.BASE_URL += '/topics';
  }

  public createTopic(topicTitle: string): Observable<ResponseMessage> {
    return this.postWithAuth(new RequestOptions({url: this.BASE_URL}), {
      title: topicTitle
    }).map(this.extractResponseMessage);
  }

  public loadTopics(): Observable<Topic[]> {
    return this.getList();
  }

  public loadTopic(topicId : number): Observable<Topic>{
    return this.get(new RequestOptions({
      url: this.BASE_URL + '/' + topicId
    }));
  }

  public loadTopicByUrl(url: string): Observable<Topic>{
    return this.get(new RequestOptions({
      url: url
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

  private extractResponseMessage(resp: Response): ResponseMessage {
    return new ResponseMessage(resp.json());
  }

}
