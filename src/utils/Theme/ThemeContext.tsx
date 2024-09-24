import { createContext } from "react";

import { DARK, LIGHT } from "../../types/message";

export type Theme = typeof LIGHT | typeof DARK;

export const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: LIGHT,
  toggleTheme: () => {},
});
