import {Role, RoleInterface} from "./role.model";
/**
 * Created by vunguyenhung on 2/25/17.
 */

export interface AccountInterface{
  id : number;
  school_id: string;
  confirmed: boolean;
  created_at: Date;
  updated_at: Date;
  latest_roles: RoleInterface[];
}

export class Account implements AccountInterface{
  id: number;
  school_id: string;
  confirmed: boolean;
  created_at: Date;
  updated_at: Date;
  latest_roles: Role[];
  current_role: Role;

  public constructor(that?: AccountInterface){
    this.id = that.id;
    this.school_id = that.school_id;
    this.confirmed = that.confirmed;
    this.created_at = that.created_at;
    this.updated_at = that.updated_at;
    this.current_role = new Role(that.latest_roles[0]);
  }

}
