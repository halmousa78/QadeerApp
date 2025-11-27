import { CourseTrainerInfo } from "./CourseTrainerInfo";

export interface CourseCoordinatorItem {
    CourseKey?: string;
    Course?: string;
    CourseDescription?: string;
    TrainingTerm?: string;
    TrainingUnit?: string;
    TrainingType?: string;
    Department?: string;
    Departments?: string[];
    ReferenceNumber?: number;
    SelectedCoordinatorNumber?: number;
    Trainers?: CourseTrainerInfo[];
}