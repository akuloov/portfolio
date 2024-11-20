import {ThemeColor} from "@/types/ThemeColorType";
import {Project} from "@/types/ProjectType";

export type State = {
  darkMode: boolean
  themeColor: ThemeColor
  projects: Project[];
  isAuthenticated: boolean;
}