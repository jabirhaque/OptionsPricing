import { Typography } from "@mui/material";
import { useGetCallOptionQuery, useGetPutOptionQuery } from "../features/api";
import Heatmap from "./Heatmap";
import CallDelta from "./CallDelta.tsx";
import PutDelta from "./PutDelta.tsx";
import CallTheta from "./CallTheta.tsx";
import PutTheta from "./PutTheta.tsx";
import CallVega from "./CallVega.tsx";
import PutVega from "./PutVega.tsx";
import CallRho from "./CallRho.tsx";
import PutRho from "./PutRho.tsx";
import CallGamma from "./CallGamma.tsx";

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
            backgroundColor: "lightgreen",
            color: "black",
            borderRadius: "10px",
          }}
        >
          <Typography variant="h6" style={{ color: "black" }}>Call Option</Typography>
          {isCallLoading && <p style={{ color: "black" }}>Loading...</p>}
          {callError && <p style={{ color: "black" }}>Error fetching call option data</p>}
          {callData && <Typography variant="h6" style={{ color: "black" }}>Call Price: ${callData.call_price.toFixed(2)}</Typography>}
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
            backgroundColor: "lightcoral",
            color: "black",
            borderRadius: "10px",
          }}
        >
          <Typography variant="h6" style={{ color: "black" }}>Put Option</Typography>
          {isPutLoading && <p style={{ color: "black" }}>Loading...</p>}
          {putError && <p style={{ color: "black" }}>Error fetching put option data</p>}
          {putData && <Typography variant="h6" style={{ color: "black" }}>Put Price: ${putData.put_price.toFixed(2)}</Typography>}
        </div>
      </div>
      {/* Heatmap placed under the options boxes */}
        <div style={{marginTop: "20px", width: "100%"}}>
            <div style={{display: "flex", justifyContent: "center", marginBottom: "10px"}}>
                <Typography variant="h6">Call Price Heatmap</Typography>
            </div>
            <Heatmap
                strikePrice={inputs.K}
                time={inputs.T}
                rate={inputs.r}
                xmin={inputs.minSpotPrice}
                xmax={inputs.maxSpotPrice}
                ymin={inputs.minVolatility}
                ymax={inputs.maxVolatility}
                name={"Call Price"}
                isCall={true}
            />
            <div style={{display: "flex", gap: "10px"}}>
                <CallDelta S={inputs.S} K={inputs.K} T={inputs.T} r={inputs.r} vol={inputs.sigma}/>
                <CallTheta S={inputs.S} K={inputs.K} T={inputs.T} r={inputs.r} vol={inputs.sigma}/>
                <CallVega S={inputs.S} K={inputs.K} T={inputs.T} r={inputs.r} vol={inputs.sigma}/>
            </div>
            <div style={{display: "flex", gap: "10px"}}>
                <CallRho S={inputs.S} K={inputs.K} T={inputs.T} r={inputs.r} vol={inputs.sigma}/>
                <CallGamma S={inputs.S} K={inputs.K} T={inputs.T} r={inputs.r} vol={inputs.sigma}/>
            </div>
            <div style={{display: "flex", justifyContent: "center", marginBottom: "10px"}}>
                <Typography variant="h6">Put Price Heatmap</Typography>
            </div>
            <Heatmap
                strikePrice={inputs.K}
                time={inputs.T}
                rate={inputs.r}
                xmin={inputs.minSpotPrice}
                xmax={inputs.maxSpotPrice}
                ymin={inputs.minVolatility}
                ymax={inputs.maxVolatility}
                name={"Put Price"}
                isCall={false}
            />
            <div style={{display: "flex", gap: "10px"}}>
                <PutDelta S={inputs.S} K={inputs.K} T={inputs.T} r={inputs.r} vol={inputs.sigma}/>
                <PutTheta S={inputs.S} K={inputs.K} T={inputs.T} r={inputs.r} vol={inputs.sigma}/>
                <PutVega S={inputs.S} K={inputs.K} T={inputs.T} r={inputs.r} vol={inputs.sigma}/>
            </div>
            <div style={{display: "flex", gap: "10px"}}>
                <PutRho S={inputs.S} K={inputs.K} T={inputs.T} r={inputs.r} vol={inputs.sigma}/>
            </div>
        </div>
    </div>
  );
}//add more greeks on line 72 div