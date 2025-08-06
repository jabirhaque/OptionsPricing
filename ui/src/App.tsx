import { useState } from "react";
import { ThemeProvider, createTheme, CssBaseline, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import InputBar from "./components/InputBar.tsx";
import OptionsPrices from "./components/OptionsPrices.tsx";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const [inputs, setInputs] = useState({
    S: 100,
    K: 80,
    T: 2,
    r: 0.03,
    sigma: 0.25,
    minSpotPrice: 94,
    maxSpotPrice: 105,
    minVolatility: 0.14,
    maxVolatility: 0.25,
  });

  const handleInputChange = (field: string, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
          <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </div>
        <div style={{ display: "flex", flex: 1 }}>
          <InputBar inputs={inputs} onInputChange={handleInputChange} />
          <OptionsPrices inputs={inputs} />
        </div>
      </div>
    </ThemeProvider>
  );
}