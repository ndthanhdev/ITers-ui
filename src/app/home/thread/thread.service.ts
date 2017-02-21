import {Injectable, Injector} from "@angular/core";
import {GenericService} from "../../shared/services/generic.service";

@Injectable()
export class ThreadService extends GenericService{

  constructor(injector: Injector) {
    super(injector);
    this.BASE_URL += '';
  }

}
