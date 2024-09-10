import { ThemeProvider } from "@mui/material";
import AppRouting from "./routes";
import theme from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppRouting />
      </div>
    </ThemeProvider>
  );
};

export default App;
