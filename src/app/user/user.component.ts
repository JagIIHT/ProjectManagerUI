import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private user: User = new User();
  private saveType: string = 'Add';
  private successMessage: string = '';
  private failureMessage: string = '';
  private fnameError: string = '';
  private lnameError: string = '';
  private empIdError: string = '';
  private users: User[] = [
    {
      employeeId: "1",
      firstName: 'name',
      id: 1,
      lastName: 'last',
      projectId: 0,
      taskId: 1
    },
    {
      employeeId: "2",
      firstName: 'name1',
      id: 2,
      lastName: 'last1',
      projectId: 0,
      taskId: 1
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  save(event) {
    console.log(this.user);
    this.fnameError = this.lnameError = this.empIdError = this.failureMessage = this.successMessage = '';
    event.preventDefault();
    if (this.validate()) {
      alert(true);
    }
    this.saveService(this.user);
  }
  saveService(user: User) {
    /*   this.taskService.addTask(this.task).subscribe(
         resp => this.successMessage = 'Task added successfully!',
         error => this.failureMessage = 'Add task failed. Try again later');*/
  }
  reset() {
    this.user = new User();
    this.saveType = "Add";
    this.fnameError = this.lnameError = this.empIdError = this.failureMessage = this.successMessage = '';
  }

  validate() {
    let isValid: boolean = true;
    if (!this.user.firstName || this.user.firstName.trim() === "") {
      this.fnameError = "First Name is mandatory";
      this.failureMessage = "Mandatory fields are missing";
      isValid = false;
    }
    if (!this.user.lastName || this.user.lastName.trim() === "") {
      this.lnameError = "Last Name is mandatory";
      this.failureMessage = "Mandatory fields are missing";
      isValid = false;
    }
    if (!this.user.employeeId || this.user.employeeId.trim() === "") {
      this.empIdError = "Employee Id is mandatory";
      this.failureMessage = "Mandatory fields are missing";
      isValid = false;
    }
    return isValid;
  }

  update(user: User) {
    this.fnameError = this.lnameError = this.empIdError = this.failureMessage = this.successMessage = '';
    this.saveType = "Update";
    this.user = user;
    this.save(event);
  }

  sortByFirstName() {
    this.users = this.users.sort((a, b) => (a.firstName > b.firstName) ? 1 : -1);
  }

  sortByLastName() {
    
  }
}
