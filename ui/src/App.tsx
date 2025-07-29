import { useGetCallOptionQuery } from "./features/api";

export default function App() {
  const { data, error, isLoading } = useGetCallOptionQuery({
    S: 100,
    K: 90,
    T: 1,
    r: 0.05,
    sigma: 0.3,
  });

  return (
    <div>
      <h1>Call Option Price</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching data</p>}
      {data && <p>Call Price: {data.call_price}</p>}
    </div>
  );
}