import {State} from "@/types/StateType";

export type Action = {
  toggleDarkMode: () => void
  setDarkMode: (darkMode: State['darkMode']) => void
  setThemeColor: (themeColor: State['themeColor']) => void
  setProjects: (projects: State['projects']) => void
  setIsAuthenticated: (isAuthenticated: State['isAuthenticated']) => void
}