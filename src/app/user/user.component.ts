import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/user.service';

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
      employeeId: "11",
      firstName: 'Zen',
      id: 1,
      lastName: 'Patrick',
      projectId: 0,
      taskId: 1
    },
    {
      employeeId: "200",
      firstName: 'Richard',
      id: 21,
      lastName: 'Martin',
      projectId: 0,
      taskId: 1
    },
    {
      employeeId: "31",
      firstName: 'Jon',
      id: 3,
      lastName: 'Snow',
      projectId: 0,
      taskId: 1
    }
  ];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(
      resp => this.users = resp
    );
  }

  save(event) {
    console.log(this.user);
    this.fnameError = this.lnameError = this.empIdError = this.failureMessage = this.successMessage = '';
    event.preventDefault();
    if (this.validate()) {
      this.saveService(this.user);
    }
  }
  saveService(user: User) {
    this.userService.saveUser(this.user).subscribe(
      resp => {
        this.successMessage = 'User added successfully!';
        this.getAllUsers();
      },
      error => this.failureMessage = 'Add User failed. Try again later');
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

  edit(user: User) {
    this.fnameError = this.lnameError = this.empIdError = this.failureMessage = this.successMessage = '';
    this.saveType = "Update";
    this.user = user;
  }

  delete(user: User) {
    this.fnameError = this.lnameError = this.empIdError = this.failureMessage = this.successMessage = '';
    this.successMessage = "User Deleted";
  }

  sortByFirstName() {
    this.users = this.users.sort((a, b) => (a.firstName > b.firstName) ? 1 : -1);
  }

  sortByLastName() {
    this.users = this.users.sort((a, b) => (a.lastName > b.lastName) ? 1 : -1);
  }

  sortByEmpId() {
    this.users = this.users.sort((a, b) => (a.employeeId > b.employeeId) ? 1 : -1);
  }
}
