import { Box, List, ListItem, TextField, Typography } from "@mui/material";

export default function InputBar({ inputs, onInputChange }: { inputs: any; onInputChange: (field: string, value: string) => void }) {
  return (
    <Box
      sx={{
        width: "15%",
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
            value={inputs.S}
            onChange={(e) => onInputChange("S", e.target.value)}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="K (Strike Price)"
            variant="outlined"
            fullWidth
            type="number"
            value={inputs.K}
            onChange={(e) => onInputChange("K", e.target.value)}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="T (Time to Maturity)"
            variant="outlined"
            fullWidth
            type="number"
            value={inputs.T}
            onChange={(e) => onInputChange("T", e.target.value)}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="r (Risk-Free Rate)"
            variant="outlined"
            fullWidth
            type="number"
            value={inputs.r}
            onChange={(e) => onInputChange("r", e.target.value)}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="σ (Volatility)"
            variant="outlined"
            fullWidth
            type="number"
            value={inputs.sigma}
            onChange={(e) => onInputChange("sigma", e.target.value)}
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
            value={inputs.minSpotPrice}
            onChange={(e) => onInputChange("minSpotPrice", e.target.value)}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Max Spot Price"
            variant="outlined"
            fullWidth
            type="number"
            value={inputs.maxSpotPrice}
            onChange={(e) => onInputChange("maxSpotPrice", e.target.value)}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Min Volatility"
            variant="outlined"
            fullWidth
            type="number"
            value={inputs.minVolatility}
            onChange={(e) => onInputChange("minVolatility", e.target.value)}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Max Volatility"
            variant="outlined"
            fullWidth
            type="number"
            value={inputs.maxVolatility}
            onChange={(e) => onInputChange("maxVolatility", e.target.value)}
          />
        </ListItem>
      </List>
    </Box>
  );
}