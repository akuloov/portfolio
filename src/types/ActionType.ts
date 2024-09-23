import {State} from "@/types/StateType";

export type Action = {
  toggleDarkMode: () => void
  setDarkMode: (darkMode: State['darkMode']) => void
  setThemeColor: (themeColor: State['themeColor']) => void
}