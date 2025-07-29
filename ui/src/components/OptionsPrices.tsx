import { Typography } from "@mui/material";
import { useGetCallOptionQuery, useGetPutOptionQuery } from "../features/api";

export default function OptionsPrices({ inputs }: { inputs: any }) {
  const { data: callData, error: callError, isLoading: isCallLoading } = useGetCallOptionQuery(inputs);
  const { data: putData, error: putError, isLoading: isPutLoading } = useGetPutOptionQuery(inputs);

  return (
    <div style={{ marginLeft: "20px", flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
        <Typography variant="h4">Options Prices</Typography>
      </div>
      <div style={{ display: "flex", gap: "20px" }}>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "lightgreen", // Light green for call option
          }}
        >
          <Typography variant="h6">Call Option</Typography>
          {isCallLoading && <p>Loading...</p>}
          {callError && <p>Error fetching call option data</p>}
          {callData && <Typography variant="h6">Call Price: ${callData.call_price.toFixed(2)}</Typography>}
        </div>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "lightcoral", // Light red for put option
          }}
        >
          <Typography variant="h6">Put Option</Typography>
          {isPutLoading && <p>Loading...</p>}
          {putError && <p>Error fetching put option data</p>}
          {putData && <Typography variant="h6">Put Price: ${putData.put_price.toFixed(2)}</Typography>}
        </div>
      </div>
    </div>
  );
}