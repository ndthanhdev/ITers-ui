/**
 * Created by vunguyenhung on 2/27/17.
 */
import {Pipe, PipeTransform} from "@angular/core";
@Pipe({name: 'amUTCOffset'})
export class AmUTCOffsetPipe implements PipeTransform{

  transform(date: Date, offset : number): any {
    let newDate = new Date(date);
    newDate.setHours(newDate.getHours() + offset);
    return newDate;
  }

}
