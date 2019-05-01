import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddtaskComponent } from './addtask.component';
import { UsersearchPipe } from '../pipe/usersearch.pipe';
import { ParentPipe } from '../pipe/parent.pipe';
import { ProjectPipe } from '../pipe/project.pipe';
import { DatePipe } from '@angular/common';

describe('AddtaskComponent', () => {
  let component: AddtaskComponent;
  let fixture: ComponentFixture<AddtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [AddtaskComponent, UsersearchPipe, ParentPipe, ProjectPipe],
      providers:[DatePipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
