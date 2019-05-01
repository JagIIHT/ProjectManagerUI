import { Component, OnInit } from '@angular/core';
import { TaskService } from '../service/task.service';
import { ProjectService } from '../service/project.service';
import { UserService } from '../service/user.service';
import { Project } from '../model/project';
import { Parent } from '../model/parent';
import { User } from '../model/user';
import { Task } from '../model/task';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  private task: Task = new Task();
  private successMessage: string = '';
  private failureMessage: string = '';
  private enableParent: boolean = false;
  private display: string = 'none';
  private modalTitle: string;
  private modalMessage: string;
  private modalType: string;
  private parent: Parent = new Parent();
  private project: Project = new Project();
  private user: User = new User();
  private allParent: Parent[];
  private users: User[];
  private projects: Project[];
  private taskNameError: string;
  private projectNameError: string;
  private dateError: string;
  private userError: string;

  constructor(private taskService: TaskService,
    private userService: UserService,
    private projectService: ProjectService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.task.startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.task.endDate = this.datePipe.transform(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd');
  }

  validate() {
    let isValid: boolean = true;
    if (!this.task.task || this.task.task.trim() === "") {
      this.taskNameError = "Task Name is mandatory";
      this.failureMessage = "Mandatory fields are missing";
      isValid = false;
    }
    if (!this.task.project || !this.task.project.name || this.task.project.name === "") {
      this.projectNameError = "Project Name is mandatory";
      this.failureMessage = "Mandatory fields are missing";
      isValid = false;
    }
    if (!this.enableParent && (!this.task.startDate || !this.task.endDate || this.task.startDate > this.task.endDate)) {
      this.dateError = "Invalid Start and End date";
      this.failureMessage = "Mandatory fields are missing/Invalid";
      isValid = false;
    }
    if (!this.enableParent && (!this.task.user || !this.task.user.firstName)) {
      this.userError = "User name missing";
      this.failureMessage = "Mandatory fields are missing/Invalid";
      isValid = false;
    }
    return isValid;
  }

  save(event) {
    console.log(this.task);
    event.preventDefault();
    this.successMessage = '';
    this.failureMessage = '';
    if (this.validate()) {
      if (this.task.parent && !this.task.parent.task) {
        this.task.parent = null;
      }
      this.taskService.addTask(this.task).subscribe(
        resp => this.successMessage = 'Task added successfully!',
        error => this.failureMessage = 'Add task failed. Try again later');
      if (this.enableParent) {
        this.taskService.addParentTask(this.task).subscribe(
          resp => this.successMessage = 'Parent Task added successfully!',
          error => this.failureMessage = 'Add Parent task failed. Try again later');
      }
    }
  }

  togglePTask() {
    this.enableParent = !this.enableParent;
  }

  openUserModel() {
    this.userService.getUsers().subscribe(
      resp => this.users = resp
    );
    this.modalType = 'userModal';
    this.display = 'block';
    this.modalTitle = 'Manager Selection';
    this.modalMessage = 'Please select anyone of the employee below as Manager';
  }

  openParentModel() {
    this.taskService.getAllParent().subscribe(
      resp => this.allParent = resp
    );
    this.modalType = 'parentModal';
    this.display = 'block';
    this.modalTitle = 'Parent Task Selection';
    this.modalMessage = 'Please select anyone of the task below as Parent Task';
  }
  openProjectModel() {
    this.projectService.getProjects().subscribe(
      resp => this.projects = resp
    );
    this.modalType = 'projectModal';
    this.display = 'block';
    this.modalTitle = 'Project Selection';
    this.modalMessage = 'Please select anyone of the project below';
  }

  closeModal() {
    this.display = 'none';
  }

  selectedUser(user: User, event: Event) {
    event.preventDefault();
    this.user = user;
  }

  selectedProject(project: Project, event: Event) {
    event.preventDefault();
    this.project = project;
  }

  selectedParent(parent: Parent, event: Event) {
    event.preventDefault();
    this.parent = parent;
  }

  add() {
    if (this.modalType === 'userModal') {
      this.task.user = this.user;
    }
    if (this.modalType === 'parentModal') {
      this.task.parent = this.parent;
    }
    if (this.modalType === 'projectModal') {
      this.task.project = this.project;
    }
    this.display = "none";
  }
}
