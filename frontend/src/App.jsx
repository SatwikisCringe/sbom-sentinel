import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("Connecting...");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/health")
      .then((response) => {
        setMessage(response.data.status);
      })
      .catch(() => {
        setMessage("Backend Not Connected");
      });
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>🛡 SBOM Sentinel</h1>
      <h2>{message}</h2>
      <p>Enterprise Software Supply Chain Risk Analyzer</p>
    </div>
  );
}

export default App;