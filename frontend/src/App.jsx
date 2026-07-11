import { useEffect, useState } from "react";
import { getDashboardData } from "./api";
import { FaShieldAlt, FaBug, FaFileContract, FaProjectDiagram } from "react-icons/fa";

function App() {
  const [score, setScore] = useState(82);
  const [vulnerabilities, setVulnerabilities] = useState(5);
  const [licenseIssues, setLicenseIssues] = useState(2);
  const [dependencies, setDependencies] = useState(50);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getDashboardData();

        setScore(data.security_score);
        setVulnerabilities(data.vulnerabilities);
        setLicenseIssues(data.license_issues);
        setDependencies(data.dependencies);
      } catch (error) {
        console.log("Backend not connected yet");
      }
    }

    loadData();
  }, []);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🛡️ SBOM Sentinel</h1>
        <p style={styles.subtitle}>
          Software Supply Chain Risk Analyzer
        </p>
      </div>

      {/* Upload Section */}
      <div style={styles.uploadCard}>
        <h2 style={styles.sectionTitle}>📂 Upload SBOM</h2>
        <input type="file" style={styles.fileInput} />
      </div>

      {/* Metrics */}
      <div style={styles.metricsGrid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Security Score</h3>
          <h1 style={styles.cardValue}>{score}</h1>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Vulnerabilities</h3>
          <h1 style={styles.cardValue}>{vulnerabilities}</h1>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>License Issues</h3>
          <h1 style={styles.cardValue}>{licenseIssues}</h1>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Dependencies</h3>
          <h1 style={styles.cardValue}>{dependencies}</h1>
        </div>
      </div>

      {/* Recent Scan + Recommendations */}
      <div style={styles.contentGrid}>
        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>📊 Recent Scan</h2>
          <p style={styles.text}>
            Waiting for SBOM upload...
          </p>
        </div>

        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>🤖 AI Recommendations</h2>
          <ul style={styles.list}>
            <li>Upgrade vulnerable packages.</li>
            <li>Remove incompatible licenses.</li>
            <li>Update outdated dependencies.</li>
            <li>Apply available security patches.</li>
          </ul>
        </div>
      </div>

      {/* Dependency Graph */}
      <div style={styles.graphPanel}>
        <h2 style={styles.panelTitle}>🔗 Dependency Graph</h2>

        <div style={styles.graphPlaceholder}>
          Graph Visualization Coming Soon
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
    padding: "30px",
    fontFamily: "Segoe UI, sans-serif",
  },

  header: {
    textAlign: "center",
    marginBottom: "30px",
  },

  title: {
    fontSize: "48px",
    marginBottom: "10px",
    color: "#38bdf8",
  },

  subtitle: {
    fontSize: "20px",
    color: "#cbd5e1",
  },

  uploadCard: {
    background: "#1e293b",
    padding: "25px",
    borderRadius: "15px",
    marginBottom: "30px",
    textAlign: "center",
    boxShadow: "0 0 15px rgba(56,189,248,0.15)",
  },

  sectionTitle: {
    marginBottom: "15px",
  },

  fileInput: {
    color: "white",
  },

  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  card: {
    background: "#1e293b",
    borderRadius: "15px",
    padding: "25px",
    textAlign: "center",
    boxShadow: "0 0 12px rgba(56,189,248,0.15)",
  },

  cardTitle: {
    color: "#94a3b8",
    marginBottom: "10px",
  },

  cardValue: {
    color: "#38bdf8",
    fontSize: "56px",
    margin: 0,
  },

  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  },

  panel: {
    background: "#1e293b",
    padding: "25px",
    borderRadius: "15px",
    minHeight: "220px",
  },

  panelTitle: {
    color: "#38bdf8",
    marginBottom: "15px",
  },

  text: {
    color: "#cbd5e1",
  },

  list: {
    color: "#cbd5e1",
    lineHeight: "2",
  },

  graphPanel: {
    background: "#1e293b",
    padding: "25px",
    borderRadius: "15px",
  },

  graphPlaceholder: {
    height: "250px",
    border: "2px dashed #38bdf8",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#94a3b8",
    marginTop: "15px",
    fontSize: "20px",
  },
};

export default App;