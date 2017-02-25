import {Injectable, Injector} from "@angular/core";
import {RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Account} from "../shared/models/account.model";
import {JwtHelper} from "angular2-jwt";
import {GenericService} from "../shared/services/generic.service";

@Injectable()
export class AuthService extends GenericService {

  constructor(injector: Injector) {
    super(injector);
    this.BASE_URL += '/auth';
  }

  public login(schoolId: string, password: string): Observable<Account> {
    return this.post(new RequestOptions({url: this.BASE_URL + '/login'}), {
      school_id: schoolId,
      password: password
    }).map(this.extractToken)
      .do(token => localStorage.setItem('id_token', token))
      .map(this.extractAccount)
      .catch(this.handleError)
  }

  private extractToken(response: Response) {
    return response.json().data.token;
  }

  private extractAccount(token: string) {
    let jwtHelper = new JwtHelper();
    let rawAccount = jwtHelper.decodeToken(token);
    return new Account(rawAccount);
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
