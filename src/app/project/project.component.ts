import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Project } from '../model/project';
import { DatePipe } from '@angular/common';
import { ProjectService } from '../service/project.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  private project: Project = new Project();
  private successMessage: string = '';
  private failureMessage: string = '';
  private enableDate: boolean = false;
  private dateType: any = "text";
  private nameError: string = "";
  private managerError: string = "";
  private dateError: string = "";
  private saveType: string = 'Add';
  private display: string = 'none';
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

  constructor(private datePipe: DatePipe,
    private userService: UserService,
    private projectService: ProjectService) { }

  ngOnInit() {
    this.project.priority = 0;
    this.getAllProjects();
  }

  getAllProjects() {
    this.projectService.getProjects().subscribe(
      resp => this.projects = resp
    );
  }

  save(event) {
    console.log(this.project);
    this.nameError = this.dateError = this.managerError = this.failureMessage = this.successMessage = '';
    event.preventDefault();
    if (this.validate()) {
      this.saveService(this.project);
    }
  }
  saveService(project: Project) {
    this.projectService.saveProject(project).subscribe(
      resp => {
        this.successMessage = 'Project added successfully!';
        this.getAllProjects();
      },
      error => this.failureMessage = 'Add Project failed. Try again later');
  }
  reset() {
    this.project = new Project();
    this.user = new User();
    this.saveType = "Add";
    this.project.priority = 0;
    this.enableDate = false;
    this.dateType = "text";
    this.nameError = this.dateError = this.managerError = this.failureMessage = this.successMessage = '';
  }

  toggleDate() {
    this.enableDate = !this.enableDate;
    if (this.enableDate) {
      this.project.startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.project.endDate = this.datePipe.transform(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd');
      this.dateType = "date";
    } else {
      this.project.startDate = '';
      this.project.endDate = '';
      this.dateType = "text";
    }
  }

  validate() {
    let isValid: boolean = true;
    if (!this.project.name || this.project.name.trim() === "") {
      this.nameError = "Project Name is mandatory";
      this.failureMessage = "Mandatory fields are missing";
      isValid = false;
    }
    if (!this.project.user.firstName || this.project.user.firstName.trim() === "") {
      this.managerError = "Manager Name is mandatory";
      this.failureMessage = "Mandatory fields are missing";
      isValid = false;
    }
    if (this.enableDate && (this.project.startDate > this.project.endDate)) {
      this.dateError = "Invalid Start and End date";
      this.failureMessage = "Mandatory fields are missing/Invalid";
      isValid = false;
    }
    return isValid;
  }

  update(project: Project) {
    this.nameError = this.dateError = this.managerError = this.failureMessage = this.successMessage = '';
    this.saveType = "Update";
    if (project.startDate && project.endDate) {
      this.enableDate = true;
      this.dateType = "date"
    }
    this.project = project;
  }

  suspend(project: Project) {
    project.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.saveService(project);
  }

  openUserModel() {
    this.display = 'block';
    this.userService.getUsers().subscribe(
      resp => this.users = resp
    );
  }

  closeUserModal() {
    this.display = 'none';
  }

  selectedUser(user: User, event: Event) {
    event.preventDefault();
    this.user = user;
  }

  addUser() {
    this.project.user = this.user;
    this.display = "none";
    console.log(this.project);
  }

  sortByPriority() {
    this.projects = this.projects.sort((a, b) => a.priority - b.priority);
    console.log(this.projects);
  }

  sortByStartDate() {
    this.projects = this.projects.sort((a, b) => (a.startDate > b.startDate ? 1 : -1));
    console.log(this.projects);
  }

  sortByEndDate() {
    this.projects = this.projects.sort((a, b) => (a.endDate > b.endDate ? 1 : -1));
    console.log(this.projects);
  }

  sortByStatus() {
    this.projects = this.projects.sort((a, b) => (a.status > b.status ? 1 : -1));
    console.log(this.projects);
  }
}
