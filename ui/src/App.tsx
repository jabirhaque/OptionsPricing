import { useState } from "react";
import InputBar from "./components/InputBar.tsx";
import OptionsPrices from "./components/OptionsPrices.tsx";

export default function App() {
  const [inputs, setInputs] = useState({
    S: 100,
    K: 100,
    T: 1,
    r: 0.05,
    sigma: 0.2,
    minSpotPrice: 94,
    maxSpotPrice: 105,
    minVolatility: 0.14,
    maxVolatility: 0.25,
  });

  const handleInputChange = (field: string, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [field]: parseFloat(value) || 0, // Convert input to a number
    }));
  };

  return (
      <>
        <div style={{display: "flex"}}>
          <InputBar inputs={inputs} onInputChange={handleInputChange}/>
          <OptionsPrices inputs={inputs}/>
        </div>
      </>
  );
}