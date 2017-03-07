import {Injectable, Injector} from "@angular/core";
import {GenericService} from "../../shared/services/generic.service";
import {Observable} from "rxjs";
import {Settings} from "../../shared/models/settings.model";
import {ResponseMessage} from "../../shared/models/response-message.model";
import {RequestOptions} from "@angular/http";

@Injectable()
export class SettingService extends GenericService {

  constructor(injector: Injector) {
    super(injector);
    this.BASE_URL += '/settings';
  }

  public loadSettings(): Observable<Settings> {
    return this.getWithAuth().map(resp => resp.json());
  }

  public editSettings(settings: Settings): Observable<ResponseMessage> {
    return this.patchWithAuth(new RequestOptions({url: this.BASE_URL}), {
      AUTO_USER_CONFIRMATION: settings.AUTO_USER_CONFIRMATION,
      AUTO_POST_CONFIRMATION: settings.AUTO_POST_CONFIRMATION
    }).map(resp => resp.json());
  }

}
