import {Injector} from "@angular/core";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {AuthHttp} from "angular2-jwt";
/**
 * Created by vunguyenhung on 2/20/17.
 */

export class GenericService {

  protected http;
  protected authHttp;

  protected BASE_URL: string = 'http://homestead.app/api';

  constructor(injector: Injector) {
    this.http = injector.get(Http);
    this.authHttp = injector.get(AuthHttp);
  }

  protected patchWithAuth(options?: RequestOptions, data?: Object|string): Observable<any> {
    return this.authHttp.patch(this.BASE_URL, data, this.defaultRequestOptions().merge(options));
  }

  protected postWithAuth(options?: RequestOptions, data?: Object|string): Observable<any> {
    return this.authHttp.post(this.BASE_URL, data, this.defaultRequestOptions().merge(options));
  }

  protected putWithAuth(options?: RequestOptions, data?: Object|string): Observable<any> {
    return this.authHttp.put(this.BASE_URL, data, this.defaultRequestOptions().merge(options));
  }

  protected post(options?: RequestOptions, data?: Object|string): Observable<any> {
    return this.http.post(this.BASE_URL, data, this.defaultRequestOptions().merge(options));
  }

  protected get(options?: RequestOptions): Observable<any> {
    return this.request(options).map(this.extractData);
  }

  /**
   * Perform getList request with specified options to server.
   * @param options? optional options, if this is null, then this method will perform getAll.
   * @returns Observable has type T[] that match the specified option.
   */
  protected getList(options?: RequestOptions): Observable<any> {
    return this.request(options).map(this.extractDataList);
  }

  /**
   * Perform request with optional options merged with defaultRequestOptions to server.
   * @param options? optional options, if this is null, then this method will perform getList.
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
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
  }

  protected extractDataList(resp: Response): any[] {
    return resp.json();
  }

  protected extractData(resp: Response): any {
    return resp.json();
  }
}
