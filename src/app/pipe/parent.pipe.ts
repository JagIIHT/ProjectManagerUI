import { Pipe, PipeTransform } from '@angular/core';
import { Parent } from '../model/parent';

@Pipe({
  name: 'filterparent'
})
export class ParentPipe implements PipeTransform {

  transform(parents: Parent[], name?: string): Parent[] {
    if (!parents) {
      return [];
    }
    if (!name) {
      return parents;
    }
    return parents.filter(parent => {
      if (parent && parent.task && parent.task.toLowerCase().includes(name.toLowerCase())) {
        return true;
      }
      return false;
    });
  }

}
