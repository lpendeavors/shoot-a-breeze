import { ProjectCategory } from "./project-category.model";
import { ProjectTask } from "./project-task.model";
import { ProjectTaskLink } from "./project-task-link.model";
import { ProjectTreatment } from "./project-treatment.model";
import { ShotListItem } from './shot-list-item.models';
import { CastMember } from './cast-member.model';
import { CrewMember } from './crew-member.model';
import { Budget } from '../budget/budget.model';

export interface Project {
    id?: string,
    title: string,
    description: string,
    startDate: Date;
    endDate: Date;
    category: ProjectCategory,
    tasks?: ProjectTask[]
    taskLinks?: ProjectTaskLink[],
    treatment?: ProjectTreatment,
    script?: string,
    shotList?: ShotListItem[],
    cast?: CastMember[],
    crew?: CrewMember[],
    budget?: Budget
}