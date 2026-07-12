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
    security_score: 82,
    vulnerabilities: 12,
    license_issues: 3,
    dependencies: 156,
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
      alert("Please select an SBOM file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setStatus("Analyzing SBOM...");

      await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      const response = await fetch(
        "http://127.0.0.1:8000/dashboard"
      );

      const data = await response.json();

      setDashboard(data);
      setStatus("Analysis completed successfully");
    } catch (error) {
      setStatus("Backend not connected");
    }
  };

  const graphData = [
    { name: "Critical", value: 4 },
    { name: "High", value: 5 },
    { name: "Medium", value: 2 },
    { name: "Low", value: 1 },
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
          SBOM Sentinel
        </h1>

        <p
          style={{
            color: "#9ca3af",
            marginTop: "8px",
          }}
        >
          Software Supply Chain Risk Analysis Platform
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
          Upload SBOM
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
            Drop your SBOM file here or browse manually
          </p>

          <input
            type="file"
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
            Security Score
          </p>
          <h2 style={{ color: "#ffffff" }}>
            {dashboard.security_score}
          </h2>
        </div>

        <div style={cardStyle}>
          <p style={{ color: "#9ca3af" }}>
            Vulnerabilities
          </p>
          <h2 style={{ color: "#ffffff" }}>
            {dashboard.vulnerabilities}
          </h2>
        </div>

        <div style={cardStyle}>
          <p style={{ color: "#9ca3af" }}>
            License Issues
          </p>
          <h2 style={{ color: "#ffffff" }}>
            {dashboard.license_issues}
          </h2>
        </div>

        <div style={cardStyle}>
          <p style={{ color: "#9ca3af" }}>
            Dependencies
          </p>
          <h2 style={{ color: "#ffffff" }}>
            {dashboard.dependencies}
          </h2>
        </div>
      </div>

      {/* Graph + Analysis */}
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
              Critical vulnerabilities detected
            </li>
            <li>
              License compliance issues found
            </li>
            <li>
              Dependency health evaluated
            </li>
            <li>
              Risk score calculated
            </li>
          </ul>
        </div>
      </div>

      {/* Dependency Graph */}
      <div style={cardStyle}>
        <h2 style={{ color: "#ffffff" }}>
          Dependency Graph
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
          Backend dependency graph will appear here
        </div>
      </div>
    </div>
  );
}