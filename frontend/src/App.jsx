import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function App() {
  const [dashboard, setDashboard] = useState({
    total_events: 0,
    total_anomalies: 0,
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
  });

  const [status, setStatus] = useState("Waiting for analysis...");
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/dashboard")
      .then((res) => res.json())
      .then((data) => setDashboard(data))
      .catch(() => console.log("Using demo data"));
  }, []);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an identity events CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setStatus("Analyzing identity events...");

      const uploadResponse = await fetch(
        "http://127.0.0.1:8000/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        const errorMessage =
          uploadData.detail ||
          uploadData.message ||
          "Request failed with status " + uploadResponse.status;

        throw new Error(errorMessage);
      }

      const response = await fetch(
        "http://127.0.0.1:8000/dashboard"
      );

      const data = await response.json();

      setDashboard(data);

      setStatus(
        "Analysis completed: " +
          uploadData.filename +
          " (" +
          uploadData.total_records +
          " records)"
      );

      alert(
        "Successfully analyzed " +
          uploadData.filename +
          "\nRecords: " +
          uploadData.total_records
      );
    } catch (error) {
      setStatus("Upload failed: " + error.message);
      console.error(error);
    }
  };

  const graphData = [
    { name: "Critical", value: dashboard.critical },
    { name: "High", value: dashboard.high },
    { name: "Medium", value: dashboard.medium },
    { name: "Low", value: dashboard.low },
  ];

  const COLORS = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
  ];

  const cardStyle = {
    background: "#111827",
    border: "1px solid #1f2937",
    borderRadius: "12px",
    padding: "24px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0f14",
        color: "#ffffff",
        padding: "40px",
        fontFamily: "Inter, Segoe UI, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "35px" }}>
        <h1
          style={{
            color: "#ffffff",
            fontSize: "40px",
            margin: 0,
            fontWeight: "700",
          }}
        >
          Identity Risk Sentinel
        </h1>

        <p
          style={{
            color: "#9ca3af",
            marginTop: "8px",
          }}
        >
          Identity &amp; Access Risk Analysis Platform
        </p>
      </div>

      {/* Upload Section */}
      <div
        style={{
          ...cardStyle,
          marginBottom: "24px",
        }}
      >
        <h2 style={{ color: "#ffffff" }}>
          Upload Identity Event Data
        </h2>

        <div
          style={{
            border: "1px dashed #374151",
            borderRadius: "10px",
            padding: "40px",
            textAlign: "center",
            color: "#ffffff",
          }}
        >
          <p>
            Upload an identity events CSV for analysis
          </p>

          <input
            type="file"
            accept=".csv"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
            style={{
              color: "#ffffff",
              marginTop: "10px",
            }}
          />

          <br />

          <button
            onClick={handleUpload}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              background: "#111827",
              color: "#ffffff",
              border: "1px solid #374151",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Analyze
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div style={cardStyle}>
          <p style={{ color: "#9ca3af" }}>
            Total Events
          </p>

          <h2 style={{ color: "#ffffff" }}>
            {dashboard.total_events}
          </h2>
        </div>

        <div style={cardStyle}>
          <p style={{ color: "#9ca3af" }}>
            Total Anomalies
          </p>

          <h2 style={{ color: "#ffffff" }}>
            {dashboard.total_anomalies}
          </h2>
        </div>

        <div style={cardStyle}>
          <p style={{ color: "#9ca3af" }}>
            Critical Alerts
          </p>

          <h2 style={{ color: "#ffffff" }}>
            {dashboard.critical}
          </h2>
        </div>

        <div style={cardStyle}>
          <p style={{ color: "#9ca3af" }}>
            High Risk
          </p>

          <h2 style={{ color: "#ffffff" }}>
            {dashboard.high}
          </h2>
        </div>
      </div>

      {/* Graph and Analysis */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "24px",
        }}
      >
        <div style={cardStyle}>
          <h2 style={{ color: "#ffffff" }}>
            Risk Distribution
          </h2>

          <ResponsiveContainer
            width="100%"
            height={260}
          >
            <PieChart>
              <Pie
                data={graphData}
                dataKey="value"
                outerRadius={90}
                label
              >
                {graphData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={cardStyle}>
          <h2 style={{ color: "#ffffff" }}>
            Recent Analysis
          </h2>

          <p style={{ color: "#9ca3af" }}>
            {status}
          </p>

          <ul
            style={{
              color: "#d1d5db",
              lineHeight: "2",
            }}
          >
            <li>
              Critical access anomalies detected
            </li>
            <li>
              Suspicious user behavior identified
            </li>
            <li>
              Severity distribution calculated
            </li>
            <li>
              Investigation context generated
            </li>
          </ul>
        </div>
      </div>

      {/* Identity Risk Overview */}
      <div style={cardStyle}>
        <h2 style={{ color: "#ffffff" }}>
          Identity Risk Overview
        </h2>

        <div
          style={{
            height: "320px",
            border: "1px dashed #374151",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9ca3af",
          }}
        >
          Recent alerts and risky-user insights will appear here
        </div>
      </div>
    </div>
  );
}