import { Pipe, PipeTransform } from '@angular/core';
import { User } from './model/user';

@Pipe({
  name: 'usersearch'
})
export class UsersearchPipe implements PipeTransform {

  transform(users: User[], name?: string): any {
    if (!users) {
      return [];
    }
    if (!name || name.trim().length === 0) {
      return users;
    }
    return users.filter(user => {
      if (user.firstName && name && user.firstName.includes(name)) {
        return true;
      }
      return false;
    });
  }
}
