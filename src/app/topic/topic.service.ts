import {Injectable, Injector} from "@angular/core";
import {Observable} from "rxjs";
import {Topic, TopicInterface} from "../shared/models/topic.model";
import {GenericService} from "../shared/services/generic.service";
import {Response} from "@angular/http";

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
