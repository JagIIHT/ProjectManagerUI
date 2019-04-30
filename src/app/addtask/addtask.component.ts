import { Component, OnInit } from '@angular/core';
import { TaskService } from '../service/task.service';
import { Project } from '../model/project';
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
  private dateType: string = 'text';

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
}
