import {create} from 'zustand'
import {ThemeColor} from "@/types/ThemeColorType";
import {State} from "@/types/StateType";
import {Action} from "@/types/ActionType";
import {Project} from "@/types/ProjectType";

const useStore = create<State & Action>((set) => ({
  darkMode: true,
  toggleDarkMode: () => set((state: { darkMode: boolean }) => ({darkMode: !state.darkMode})),
  setDarkMode: (newDarkMode: boolean) => set({darkMode: newDarkMode}),
  
  themeColor: "ThemeBlue" as ThemeColor,
  setThemeColor: (newThemeColor: ThemeColor) => set({themeColor: newThemeColor}),
  
  projects: [],
  setProjects: (newProjects: Project[]) => set({projects: newProjects}),
  
  isAuthenticated: false,
  setIsAuthenticated: (newIsAuthenticated: boolean) => set({isAuthenticated: newIsAuthenticated}),
}))
export default useStore