import { useEffect, useState } from "react";

const App = () => {
  //`https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

  const [input, setInput] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [error, setError] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const getCurrency = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${input}&from=${from}&to=${to}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        if (data.rates) setOutput(data.rates[`${to}`]);
        setError("");
      } catch (err) {
        if (err.name!=="AbortErro") setError(err.message);
      } finally {
        setIsLoading(false);
      }

      return () => {
        controller.abort();
      }
    };
    
    if (from===to) {
      setOutput(input);
      return;
    }

    getCurrency();
  }, [from, input, to]);

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Enter amount..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <select value={from} onChange={(e) => setFrom(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select value={to} onChange={(e) => setTo(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
      </div>
      <p>
        {error && `${error}`}
        {input && (isLoading ? `Loading...` : `${output} ${to}`)}
      </p>
    </>
  );
};

export default App;
