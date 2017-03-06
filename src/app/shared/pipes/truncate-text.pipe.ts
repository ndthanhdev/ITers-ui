import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

  transform(value: string, limit): any {
    if(!value) return null;
    return value.substr(0, limit).concat('...');
  }

}
