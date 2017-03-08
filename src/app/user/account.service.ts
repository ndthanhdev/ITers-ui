import {Injectable, Injector} from "@angular/core";
import {GenericService} from "../shared/services/generic.service";
import {Observable} from "rxjs";
import {RequestOptions, Response} from "@angular/http";
import {Account, AccountInterface} from "../shared/models/account.model";

@Injectable()
export class AccountService extends GenericService {

  constructor(injector: Injector) {
    super(injector);
    this.BASE_URL += '/accounts';
  }

  public loadUnconfirmedAccounts(): Observable<Account[]> {
    return this.getList(new RequestOptions({
      url: this.BASE_URL + '/unconfirmed'
    }));
  }

  public loadRecentAccounts(): Observable<Account[]> { // get account from yesterday to now
    return this.getList(new RequestOptions({
      url: this.BASE_URL + '/recent'
    }));
  }

  protected extractDataList(resp: Response): Account[] {
    let objectBasedData: Account[] = [];
    let responseBasedData: AccountInterface[] = JSON.parse(resp.text());
    responseBasedData.forEach(data => objectBasedData.push(new Account(data)));
    return objectBasedData;
  }

}
