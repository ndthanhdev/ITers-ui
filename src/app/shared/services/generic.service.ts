import {Injector} from "@angular/core";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
/**
 * Created by vunguyenhung on 2/20/17.
 */

export class GenericService {

  protected http;

  protected BASE_URL: string = 'http://homestead.app/api';

  constructor(injector: Injector) {
    this.http = injector.get(Http);
  }

  protected post(options?: RequestOptions): Observable<any> {
    return this.post(options).map(this.extractData);
  }


  /**
   * Perform get request with specified options to server.
   * @param options? optional options, if this is null, then this method will perform getAll.
   * @returns Observable has type T[] that match the specified option.
   */
  protected get(options?: RequestOptions): Observable<any> {
    return this.request(options).map(this.extractData);
  }

  /**
   * Perform request with optional options merged with defaultRequestOptions to server.
   * @param options? optional options, if this is null, then this method will perform get.
   * @returns Observable has type Response
   */
  protected request(options?: RequestOptions): Observable<Response> {
    return this.http.request(this.BASE_URL, this.defaultRequestOptions().merge(options));
  }

  /**
   * Returns a default RequestOptions instance with default Headers
   */
  protected defaultRequestOptions(): RequestOptions {
    return new RequestOptions({
      headers: this.defaultHeaders()
    })
  }

  /**
   * Returns a default Headers instance
   */
  protected defaultHeaders(): Headers {
    return new Headers({
      'Accept': 'application/json'
    });
  }

  protected extractData(resp: Response): any[] {
    return resp.json();
  }
}
