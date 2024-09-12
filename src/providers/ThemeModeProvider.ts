import {createContext} from "react";
import {ThemeMode} from "@/types/ThemeModeType";

export const ThemeModeContext = createContext<ThemeMode | undefined>(undefined);