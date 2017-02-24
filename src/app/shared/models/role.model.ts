/**
 * Created by vunguyenhung on 2/25/17.
 */

export interface RoleInterface {
  id: number;
  privilege_level: number;
  valid_from: Date;
  valid_to: Date;
}

export class Role implements RoleInterface {
  id: number;
  privilege_level: number;
  valid_from: Date;
  valid_to: Date;

  public constructor(that?: RoleInterface) {
    this.id = that.id;
    this.privilege_level = that.privilege_level;
    this.valid_from = that.valid_from;
    this.valid_to = that.valid_to;
  }

  public role(): string {
    switch (this.privilege_level){
      case 1:
        return 'User';
      case 2:
        return 'Mod';
      case 3:
        return 'Admin';
      default:
        return 'Guest'
    }
  }

}
