import {State} from "@/types/StateType";
import {Project} from "@/types/ProjectType";

export type Action = {
  toggleDarkMode: () => void
  setDarkMode: (darkMode: State['darkMode']) => void
  setThemeColor: (themeColor: State['themeColor']) => void
  setProjects: (projects: Project[] | ((prevProjects: Project[]) => Project[])) => void;
  setIsAuthenticated: (isAuthenticated: State['isAuthenticated']) => void
}