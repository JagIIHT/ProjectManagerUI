import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TaskService } from '../service/task.service';
import { ProjectService } from '../service/project.service';
import { Project } from '../model/project';
import { Parent } from '../model/parent';
import { Task } from '../model/task';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {
  private todayDate: any = new Date();
  private tasks: Task[];
  private project: Project = new Project();
  private display: string = 'none';
  private searchItem: string;
  private projects: Project[];

  constructor(private datePipe: DatePipe,
    private projectService: ProjectService,
    private taskService: TaskService) { }

  ngOnInit() {
    this.todayDate = this.datePipe.transform(this.todayDate, 'yyyy-MM-dd');
    this.taskService.getTasks().subscribe(resp => this.tasks = resp);
  }

  endTask(task) {
    this.taskService.endTask(task.id).subscribe(
      resp => this.taskService.getTasks().subscribe(resp => this.tasks = resp)
    );
  }

  getAllProjects() {
    this.projectService.getProjects().subscribe(
      resp => this.projects = resp
    );
  }

  openProjectModel() {
    this.getAllProjects();
    this.display = 'block';
    this.searchItem = '';
  }

  closeModal() {
    this.display = 'none';
  }

  add() {
    this.searchItem = this.project.name;
    this.display = "none";
  }

  selectedProject(project: Project, event: Event) {
    event.preventDefault();
    this.project = project;
  }

  sortByPriority() {
    this.tasks = this.tasks.sort((a, b) => a.priority - b.priority);
    console.log(this.tasks);
  }

  sortByStartDate() {
    this.tasks = this.tasks.sort((a, b) => (a.startDate > b.startDate ? 1 : -1));
    console.log(this.tasks);
  }

  sortByEndDate() {
    this.tasks = this.tasks.sort((a, b) => (a.endDate > b.endDate ? 1 : -1));
  }

  sortByStatus() {
    //this.tasks = this.tasks.sort((a, b) => (a.status > b.status ? 1 : -1));
  }
}
