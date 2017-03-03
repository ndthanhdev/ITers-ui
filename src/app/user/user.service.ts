import {Injectable, Injector} from "@angular/core";
import {Response, RequestOptions} from "@angular/http";
import {User} from "../shared/models/user.model";
import {GenericService} from "../shared/services/generic.service";
import {Observable} from "rxjs";
import {ResponseMessage} from "../shared/models/response-message.model";

@Injectable()
export class UserService extends GenericService {

  constructor(injector: Injector) {
    super(injector);
    this.BASE_URL += '/users';
  }

  public loadUser(userId: number): Observable<User> {
    return this.get(new RequestOptions({
      url: this.BASE_URL + '/' + userId
    }));
  }

  public editUser(user: User): Observable<ResponseMessage> {
    return this.patchWithAuth(new RequestOptions({url: this.BASE_URL + '/' + user.id}), {
      full_name: user.full_name,
      start_year: user.start_year,
      birthday: user.birthday
    });
  }

  protected extractData(resp: Response): User {
    return new User(resp.json());
  }

}
