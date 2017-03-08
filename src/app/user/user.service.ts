import {Injectable, Injector} from "@angular/core";
import {Response, RequestOptions} from "@angular/http";
import {User, UserInterface} from "../shared/models/user.model";
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

  public loadPopularUsers(): Observable<User[]> {
    return this.getList(new RequestOptions({
      url: this.BASE_URL + '/popular'
    }))
  }

  public updateRole(userId: number, privilege_level: number): Observable<ResponseMessage> {
    return this.patchWithAuth(new RequestOptions({url: this.BASE_URL + '/' + userId + '/accounts/roles'}), {
      privilege_level: privilege_level
    });
  }

  public syncUserTopic(userId: number, topics: number[]): Observable<ResponseMessage> {
    return this.putWithAuth(new RequestOptions({url: this.BASE_URL + '/' + userId + '/topics'}), {
      topics: topics
    })
  }

  public confirmAccount(userId: number): Observable<ResponseMessage> {
    return this.patchWithAuth(new RequestOptions({url: this.BASE_URL + '/' + userId + '/accounts/'}), {
      confirmation: true
    });
  }

  protected extractData(resp: Response): User {
    return new User(resp.json());
  }

  protected extractDataList(resp: Response): User[] {
    let objectBasedData: User[] = [];
    let responseBasedData: UserInterface[] = JSON.parse(resp.text());
    responseBasedData.forEach(data => objectBasedData.push(new User(data)));
    return objectBasedData;
  }

}
