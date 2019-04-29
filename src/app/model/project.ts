import { User } from './user';

export class Project {
    projectId: number;
    name: string;
    priority: number = 0;
    startDate: string;
    endDate: string;
    status: string;
    user: User = new User();
}