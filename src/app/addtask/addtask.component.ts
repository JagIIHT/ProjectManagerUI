import { Component, OnInit } from '@angular/core';
import { TaskService } from '../service/task.service';
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
  private projects: Project[] = [
    {
      projectId: 1,
      name: 'p4',
      priority: 4,
      startDate: this.datePipe.transform(new Date().setDate(new Date().getDate() + 5), 'yyyy-MM-dd'),
      endDate: '2019-06-01',
      status: 'Completed',
      user: new User()
    },
    {
      projectId: 2,
      name: 'p2',
      priority: 1,
      startDate: this.datePipe.transform(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd'),
      endDate: '2019-08-12',
      status: 'Completed',
      user: new User()
    },
    {
      projectId: 12,
      name: 'p12',
      priority: 11,
      startDate: this.datePipe.transform(new Date().setDate(new Date().getDate() + 11), 'yyyy-MM-dd'),
      endDate: '2019-03-11',
      status: 'In Progress',
      user: new User()
    },
    {
      projectId: 3,
      name: 'p6rwerfesfsdgyhfvgdg',
      priority: 6,
      startDate: this.datePipe.transform(new Date().setDate(new Date().getDate() - 1), 'yyyy-MM-dd'),
      endDate: '2019-01-01',
      status: 'Completed',
      user: new User()
    }
  ];

  constructor(private taskService: TaskService, private datePipe: DatePipe) { }

  ngOnInit() {
  }

  save(event) {
    event.preventDefault();
    this.successMessage = '';
    this.failureMessage = '';
    this.taskService.addTask(this.task).subscribe(
      resp => this.successMessage = 'Task added successfully!',
      error => this.failureMessage = 'Add task failed. Try again later');
  }

  togglePTask() {
    this.enableParent = !this.enableParent;
    if (!this.enableParent) {
      this.task.parent.task = '';
    }
  }

  openUserModel() {
    this.modalType = 'userModal';
    this.display = 'block';
    this.modalTitle = 'Manager Selection';
    this.modalMessage = 'Please select anyone of the employee below as Manager';
  }

  openParentModel() {
    this.modalType = 'parentModal';
    this.display = 'block';
    this.modalTitle = 'Parent Task Selection';
    this.modalMessage = 'Please select anyone of the task below as Parent Task';
  }
  openProjectModel() {
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
    console.log(this.user, this.parent, this.project);
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
    console.log(this.task);
  }
}
