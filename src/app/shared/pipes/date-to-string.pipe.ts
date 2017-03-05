import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'dateToString'
})
export class DateToStringPipe implements PipeTransform {

  transform(date: any): string {
    if (!date) return null;
    if(typeof date === 'string')
      return date;
    else {
      return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    }
  }

}
