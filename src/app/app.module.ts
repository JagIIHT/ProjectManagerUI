import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { UpdatetaskComponent } from './updatetask/updatetask.component';
import { FiltertaskPipe } from './filtertask.pipe';
import { ProjectComponent } from './project/project.component';
import { ProjectPipe } from './project.pipe';
import { UsersearchPipe } from './usersearch.pipe';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    AddtaskComponent,
    ViewtaskComponent,
    UpdatetaskComponent,
    FiltertaskPipe,
    ProjectComponent,
    ProjectPipe,
    UsersearchPipe,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
