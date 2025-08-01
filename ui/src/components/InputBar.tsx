import { Box, List, ListItem, TextField, Typography } from "@mui/material";
import { useState } from "react";

const areInputsValid = (inputs: any) => {
  const { S, K, r, sigma, minSpotPrice, maxSpotPrice, minVolatility, maxVolatility } = inputs;
  return S > 0 && K > 0 && r > 0 && sigma > 0 && minSpotPrice > 0 && maxSpotPrice > 0 && minVolatility > 0 && maxVolatility > 0;
};

export default function InputBar({ inputs, onInputChange }: { inputs: any; onInputChange: (field: string, value: string) => void }) {
  const [localInputs, setLocalInputs] = useState(inputs);

  const handleInputChange = (field: string, value: string) => {
    const updatedInputs = { ...localInputs, [field]: value === "" ? "" : parseFloat(value) || 0 };
    setLocalInputs(updatedInputs);

    // Trigger API call only if all fields (except T) are valid
    if (areInputsValid(updatedInputs)) {
      onInputChange(field, value);
    }
  };

  return (
    <Box
      sx={{
        width: "20%",
        height: "100%",
        padding: 2,
        textAlign: "left",
        borderRight: "1px solid #ccc",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Input Variables
      </Typography>
      <List>
        <ListItem>
          <TextField
            label="S (Stock Price)"
            variant="outlined"
            fullWidth
            type="number"
            value={localInputs.S}
            onChange={(e) => handleInputChange("S", e.target.value)}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="K (Strike Price)"
            variant="outlined"
            fullWidth
            type="number"
            value={localInputs.K}
            onChange={(e) => handleInputChange("K", e.target.value)}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="T (Time to Maturity)"
            variant="outlined"
            fullWidth
            type="number"
            value={localInputs.T}
            onChange={(e) => handleInputChange("T", e.target.value)}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="r (Risk-Free Rate)"
            variant="outlined"
            fullWidth
            type="number"
            value={localInputs.r}
            onChange={(e) => handleInputChange("r", e.target.value)}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="σ (Volatility)"
            variant="outlined"
            fullWidth
            type="number"
            value={localInputs.sigma}
            onChange={(e) => handleInputChange("sigma", e.target.value)}
          />
        </ListItem>
      </List>

      <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 2 }}>
        Heatmap Parameters
      </Typography>
      <List>
        <ListItem>
          <TextField
            label="Min Spot Price"
            variant="outlined"
            fullWidth
            type="number"
            value={localInputs.minSpotPrice}
            onChange={(e) => handleInputChange("minSpotPrice", e.target.value)}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Max Spot Price"
            variant="outlined"
            fullWidth
            type="number"
            value={localInputs.maxSpotPrice}
            onChange={(e) => handleInputChange("maxSpotPrice", e.target.value)}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Min Volatility"
            variant="outlined"
            fullWidth
            type="number"
            value={localInputs.minVolatility}
            onChange={(e) => handleInputChange("minVolatility", e.target.value)}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Max Volatility"
            variant="outlined"
            fullWidth
            type="number"
            value={localInputs.maxVolatility}
            onChange={(e) => handleInputChange("maxVolatility", e.target.value)}
          />
        </ListItem>
      </List>
    </Box>
  );
}