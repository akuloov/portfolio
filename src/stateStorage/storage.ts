import {create} from 'zustand'
import {ThemeColor} from "@/types/ThemeColorType";
import {State} from "@/types/StateType";
import {Action} from "@/types/ActionType";

const useStore = create<State & Action>((set) => ({
  darkMode: true,
  toggleDarkMode: () => set((state: { darkMode: boolean }) => ({darkMode: !state.darkMode})),
  setDarkMode: (newDarkMode: boolean) => set({darkMode: newDarkMode}),
  themeColor: "ThemeBlue" as ThemeColor,
  setThemeColor: (newThemeColor: ThemeColor) => set({themeColor: newThemeColor}),
}))
export default useStore