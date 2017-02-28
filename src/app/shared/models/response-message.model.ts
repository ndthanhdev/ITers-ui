/**
 * Created by vunguyenhung on 2/21/17.
 */

export class ResponseMessage {
  msg: string;
  link: {
    name: string,
    url: string,
    method: string,
    authentication: string,
    authorization: string
  };

  constructor(that? : ResponseMessage){
    this.msg = that.msg;
    this.link = that.link;
  }
}
