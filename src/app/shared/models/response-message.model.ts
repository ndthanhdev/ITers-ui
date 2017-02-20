/**
 * Created by vunguyenhung on 2/21/17.
 */

export interface ResponseMessage {
  msg: string;
  link: {
    name: string,
    url: string,
    method: string,
    authentication: string,
    authorization: string
  }
}
