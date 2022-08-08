import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Head from "next/head";
import Email from "../components/Email";

export default function Home() {
  // const [theme, setTheme] = useRecoilState(themeState);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="">
        <Head>
          <title>SignUp</title>
        </Head>

        <main className="bg-gradient-to-br from-[#05265C] to-[#411C45] via-[#050D22]">
          <div className="flex flex-grow justify-center h-screen items-center">
            <Email />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
