import {AccountInterface, Account} from "./account.model";
/**
 * Created by vunguyenhung on 2/20/17.
 */
export interface UserInterface {
  id: number;
  full_name: string;
  start_year: number;
  email: string;
  birthday: Date;
  account: AccountInterface;
  pivot: {
    post_id: number,
    user_id: number,
    liked: boolean
  }
}

export class User implements UserInterface {
  id: number;
  full_name: string;
  start_year: number;
  email: string;
  birthday: Date;
  pivot: {post_id: number; user_id: number; liked: boolean};
  account: Account;

  public constructor(that: UserInterface) {
    this.id = that.id;
    this.full_name = that.full_name;
    this.start_year = that.start_year;
    this.email = that.email;
    this.birthday = that.birthday;
    this.pivot = that.pivot;
    if (that.account)
      this.account = new Account(that.account);
  }

}
