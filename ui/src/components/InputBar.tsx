import { List, ListItem, TextField, Typography } from "@mui/material";

export default function InputBar({ inputs, onInputChange }: { inputs: any; onInputChange: (field: string, value: string) => void }) {
  return (
      <div style={{width: "250px", borderRight: "1px solid #ccc", padding: "10px", borderBottom: "1px solid #ccc"}}>
        <Typography variant="h6" style={{marginBottom: "10px"}}>
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
      </div>
  );
}