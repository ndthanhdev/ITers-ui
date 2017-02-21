import {Injectable, Injector} from "@angular/core";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {GenericService} from "../../shared/services/generic.service";
import {Topic, TopicInterface} from "../../shared/models/topic.model";

@Injectable()
export class TopicService extends GenericService {

  constructor(injector: Injector) {
    super(injector);
    this.BASE_URL += '/topics';
  }

  public loadTopics(): Observable<Topic[]> {
    return this.get();
  }

  protected extractData(resp: Response): Topic[] {
    let objectBasedData: Topic[] = [];
    let responseBasedData: TopicInterface[] = JSON.parse(resp.text());
    responseBasedData.forEach(data => objectBasedData.push(new Topic(data)));
    return objectBasedData;
  }

}
