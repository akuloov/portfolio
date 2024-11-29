import {Project} from "@/types/ProjectType";

export interface FormValues extends Omit<Project, "id" | "imageName"> {}