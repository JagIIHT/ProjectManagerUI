import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../model/task'

@Pipe({
  name: 'filtertask'
})
export class FiltertaskPipe implements PipeTransform {

  transform(tasks?: Task[], name?: string): Task[] {
    if (!tasks) {
      return [];
    }
    if (!name) {
      return tasks;
    }

    return tasks.filter(task => {
      if (name && task.project && task.project.name && task.project.name.toLowerCase().includes(name.toLowerCase())) {
        return true;
      }
      return false;
    });
  }
}
