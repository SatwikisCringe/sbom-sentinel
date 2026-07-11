import { useState } from "react";
import {
  FaShieldAlt,
  FaBug,
  FaFileContract,
  FaProjectDiagram,
  FaUpload,
} from "react-icons/fa";

function App() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const score = 82;
  const vulnerabilities = 5;
  const licenseIssues = 2;
  const dependencies = 50;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logoRow}>
          <FaShieldAlt size={40} color="#38bdf8" />

          <div>
            <h1 style={styles.title}>SBOM Sentinel</h1>
            <p style={styles.subtitle}>
              Software Supply Chain Risk Analyzer
            </p>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div style={styles.uploadCard}>
        <FaUpload size={30} color="#38bdf8" />

        <h2 style={styles.uploadTitle}>Upload SBOM</h2>

        <p style={styles.uploadText}>
          Upload CycloneDX or SPDX files
        </p>

        <input
          type="file"
          accept=".json,.xml,.csv"
          style={styles.fileInput}
        />
      </div>

      {/* Metrics */}
      <div style={styles.metricsGrid}>
        {[
          {
            key: "security",
            icon: <FaShieldAlt size={28} color="#38bdf8" />,
            title: "Security Score",
            value: score,
          },
          {
            key: "vuln",
            icon: <FaBug size={28} color="#38bdf8" />,
            title: "Vulnerabilities",
            value: vulnerabilities,
          },
          {
            key: "license",
            icon: <FaFileContract size={28} color="#38bdf8" />,
            title: "License Issues",
            value: licenseIssues,
          },
          {
            key: "dep",
            icon: <FaProjectDiagram size={28} color="#38bdf8" />,
            title: "Dependencies",
            value: dependencies,
          },
        ].map((card) => (
          <div
            key={card.key}
            style={{
              ...styles.metricCard,
              ...(hoveredCard === card.key
                ? styles.cardHover
                : {}),
            }}
            onMouseEnter={() =>
              setHoveredCard(card.key)
            }
            onMouseLeave={() =>
              setHoveredCard(null)
            }
          >
            {card.icon}
            <p style={styles.metricTitle}>
              {card.title}
            </p>
            <h2 style={styles.metricValue}>
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Panels */}
      <div style={styles.panelGrid}>
        <div style={styles.panel}>
          <h3 style={styles.panelTitle}>
            Recent Scan
          </h3>

          <div style={styles.scanCard}>
            <strong>No scan available</strong>

            <p style={styles.smallText}>
              Upload an SBOM file to begin
              analysis.
            </p>
          </div>
        </div>

        <div style={styles.panel}>
          <h3 style={styles.panelTitle}>
            Recommendations
          </h3>

          <div style={styles.recommendation}>
            Upgrade vulnerable packages
          </div>

          <div style={styles.recommendation}>
            Remove incompatible licenses
          </div>

          <div style={styles.recommendation}>
            Update outdated dependencies
          </div>

          <div style={styles.recommendation}>
            Apply available security patches
          </div>
        </div>
      </div>

      {/* Dependency Graph */}
      <div style={styles.graphPanel}>
        <h3 style={styles.panelTitle}>
          Dependency Graph
        </h3>

        <div style={styles.graphContainer}>
          <div style={styles.mainNode}>
            SBOM Sentinel
          </div>

          <div style={styles.line}></div>

          <div style={styles.graphRow}>
            <div style={styles.graphNode}>
              Frontend
            </div>

            <div style={styles.graphNode}>
              Backend
            </div>

            <div style={styles.graphNode}>
              Vulnerability DB
            </div>
          </div>

          <div style={styles.graphRow}>
            <div style={styles.depNode}>
              React
            </div>

            <div style={styles.depNode}>
              Axios
            </div>

            <div style={styles.depNode}>
              Flask
            </div>

            <div style={styles.depNode}>
              SQLite
            </div>

            <div style={styles.depNode}>
              NVD Feed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "#ffffff",
    padding: "32px",
    fontFamily:
      "Inter, Segoe UI, sans-serif",
  },

  header: {
    marginBottom: "32px",
  },

  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  title: {
    margin: 0,
    fontSize: "32px",
    fontWeight: "700",
  },

  subtitle: {
    margin: "4px 0 0",
    color: "#94a3b8",
  },

  uploadCard: {
    background: "#111827",
    border: "2px dashed #334155",
    borderRadius: "16px",
    padding: "40px",
    textAlign: "center",
    marginBottom: "24px",
  },

  uploadTitle: {
    color: "#ffffff",
    marginTop: "12px",
  },

  uploadText: {
    color: "#94a3b8",
    marginBottom: "20px",
  },

  fileInput: {
    color: "#ffffff",
  },

  metricsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "24px",
  },

  metricCard: {
    background: "#111827",
    border: "1px solid #1f2937",
    borderRadius: "16px",
    padding: "24px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  cardHover: {
    transform: "translateY(-4px)",
    border: "1px solid #38bdf8",
  },

  metricTitle: {
    color: "#94a3b8",
    marginTop: "12px",
  },

  metricValue: {
    margin: 0,
    fontSize: "36px",
    fontWeight: "700",
    color: "#ffffff",
  },

  panelGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(350px,1fr))",
    gap: "20px",
    marginBottom: "24px",
  },

  panel: {
    background: "#111827",
    border: "1px solid #1f2937",
    borderRadius: "16px",
    padding: "24px",
  },

  panelTitle: {
    marginTop: 0,
    marginBottom: "16px",
  },

  scanCard: {
    background: "#0f172a",
    border: "1px solid #1f2937",
    borderRadius: "12px",
    padding: "16px",
  },

  smallText: {
    color: "#94a3b8",
  },

  recommendation: {
    background: "#0f172a",
    borderLeft: "3px solid #38bdf8",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "8px",
  },

  graphPanel: {
    background: "#111827",
    border: "1px solid #1f2937",
    borderRadius: "16px",
    padding: "24px",
  },

  graphContainer: {
    minHeight: "280px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  },

  mainNode: {
    background: "#38bdf8",
    color: "#0f172a",
    padding: "12px 24px",
    borderRadius: "10px",
    fontWeight: "700",
  },

  line: {
    width: "2px",
    height: "30px",
    background: "#475569",
  },

  graphRow: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  graphNode: {
    background: "#1e293b",
    border: "1px solid #334155",
    padding: "10px 20px",
    borderRadius: "10px",
  },

  depNode: {
    background: "#0f172a",
    border: "1px solid #1f2937",
    padding: "8px 16px",
    borderRadius: "8px",
    color: "#cbd5e1",
  },
};

export default App;