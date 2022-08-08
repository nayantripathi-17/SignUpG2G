import { createTheme } from "@mui/material/styles";
import { atom } from "recoil";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const themeState = atom({
  key: "theme",
  default: darkTheme,
});

export default themeState;
export { darkTheme };
