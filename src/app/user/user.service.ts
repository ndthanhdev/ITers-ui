import {Injectable, Injector} from "@angular/core";
import {Response, RequestOptions} from "@angular/http";
import {User} from "../shared/models/user.model";
import {GenericService} from "../shared/services/generic.service";
import {Observable} from "rxjs";

@Injectable()
export class UserService extends GenericService{

  constructor(injector: Injector) {
    super(injector);
    this.BASE_URL += '/users';
  }

  public loadUser(userId : number): Observable<User>{
    return this.get(new RequestOptions({
      url: this.BASE_URL + '/' + userId
    }));
  }

  protected extractData(resp: Response) : User {
    return new User(resp.json());
  }

}
