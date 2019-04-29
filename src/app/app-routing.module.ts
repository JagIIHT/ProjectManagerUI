import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddtaskComponent } from './addtask/addtask.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { UpdatetaskComponent } from './updatetask/updatetask.component';
import { ProjectComponent } from './project/project.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: AddtaskComponent
  },
  {
    path: 'add',
    component: AddtaskComponent
  },
  {
    path: 'view',
    component: ViewtaskComponent
  },
  {
    path: 'update/:id',
    component: UpdatetaskComponent
  },
  {
    path: 'project',
    component: ProjectComponent
  },
  {
    path: 'user',
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
