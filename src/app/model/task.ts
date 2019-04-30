import { Project } from './project';
import { Parent } from './parent';
import { User } from './user';

export class Task {
    task: string;
    parent: Parent = new Parent();
    priority: number = 0;
    startDate: string;
    endDate: string;
    project: Project = new Project();
    user: User = new User();
}
