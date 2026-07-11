import { useEffect, useState } from "react";
import { getDashboardData } from "./api";
import {
  FaShieldAlt,
  FaBug,
  FaFileContract,
  FaProjectDiagram,
} from "react-icons/fa";

function App() {
  const [score, setScore] = useState(82);
  const [vulnerabilities, setVulnerabilities] = useState(5);
  const [licenseIssues, setLicenseIssues] = useState(2);
  const [dependencies, setDependencies] = useState(50);
  const [hoveredCard, setHoveredCard] = useState(null);

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
        <div style={styles.logoContainer}>
          <FaShieldAlt size={60} />
          <h1 style={styles.title}>SBOM Sentinel</h1>
        </div>

        <p style={styles.subtitle}>
          Software Supply Chain Risk Analyzer
        </p>
      </div>

      {/* Upload Section */}
      <div style={styles.uploadCard}>
        <h2 style={styles.sectionTitle}>📂 Upload SBOM</h2>

        <input
          type="file"
          accept=".json,.xml,.csv"
          style={styles.fileInput}
        />
      </div>

      {/* Metrics */}
      <div style={styles.metricsGrid}>
        <div
          style={{
            ...styles.metricCard,
            ...styles.securityCard,
            ...(hoveredCard === "security"
              ? styles.cardHover
              : {}),
          }}
          onMouseEnter={() =>
            setHoveredCard("security")
          }
          onMouseLeave={() =>
            setHoveredCard(null)
          }
        >
          <FaShieldAlt size={50} />
          <h3 style={styles.metricTitle}>
            Security Score
          </h3>
          <h1 style={styles.metricValue}>{score}</h1>
        </div>

        <div
          style={{
            ...styles.metricCard,
            ...styles.vulnerabilityCard,
            ...(hoveredCard === "vulnerability"
              ? styles.cardHover
              : {}),
          }}
          onMouseEnter={() =>
            setHoveredCard("vulnerability")
          }
          onMouseLeave={() =>
            setHoveredCard(null)
          }
        >
          <FaBug size={50} />
          <h3 style={styles.metricTitle}>
            Vulnerabilities
          </h3>
          <h1 style={styles.metricValue}>
            {vulnerabilities}
          </h1>
        </div>

        <div
          style={{
            ...styles.metricCard,
            ...styles.licenseCard,
            ...(hoveredCard === "license"
              ? styles.cardHover
              : {}),
          }}
          onMouseEnter={() =>
            setHoveredCard("license")
          }
          onMouseLeave={() =>
            setHoveredCard(null)
          }
        >
          <FaFileContract size={50} />
          <h3 style={styles.metricTitle}>
            License Issues
          </h3>
          <h1 style={styles.metricValue}>
            {licenseIssues}
          </h1>
        </div>

        <div
          style={{
            ...styles.metricCard,
            ...styles.dependencyCard,
            ...(hoveredCard === "dependency"
              ? styles.cardHover
              : {}),
          }}
          onMouseEnter={() =>
            setHoveredCard("dependency")
          }
          onMouseLeave={() =>
            setHoveredCard(null)
          }
        >
          <FaProjectDiagram size={50} />
          <h3 style={styles.metricTitle}>
            Dependencies
          </h3>
          <h1 style={styles.metricValue}>
            {dependencies}
          </h1>
        </div>
      </div>

      {/* Recent Scan + Recommendations */}
      <div style={styles.contentGrid}>
        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>
            📊 Recent Scan
          </h2>

          <p style={styles.text}>
            Waiting for SBOM upload...
          </p>
        </div>

        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>
            🤖 AI Recommendations
          </h2>

          <ul style={styles.list}>
            <li>
              Upgrade vulnerable packages.
            </li>
            <li>
              Remove incompatible licenses.
            </li>
            <li>
              Update outdated dependencies.
            </li>
            <li>
              Apply available security patches.
            </li>
          </ul>
        </div>
      </div>

      {/* Dependency Graph */}
      <div style={styles.graphPanel}>
        <h2 style={styles.panelTitle}>
          🔗 Dependency Graph
        </h2>

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
    background:
      "linear-gradient(135deg, #0f172a, #111827)",
    color: "#ffffff",
    padding: "30px",
    fontFamily: "Segoe UI, sans-serif",
  },

  header: {
    textAlign: "center",
    marginBottom: "35px",
  },

  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    color: "#38bdf8",
  },

  title: {
    fontSize: "48px",
    fontWeight: "700",
    margin: 0,
  },

  subtitle: {
    fontSize: "20px",
    color: "#cbd5e1",
    marginTop: "10px",
  },

  uploadCard: {
    background: "#1e293b",
    padding: "25px",
    borderRadius: "18px",
    marginBottom: "30px",
    textAlign: "center",
    boxShadow:
      "0 0 20px rgba(56,189,248,0.15)",
  },

  sectionTitle: {
    marginBottom: "15px",
  },

  fileInput: {
    color: "#fff",
  },

  metricsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  metricCard: {
    borderRadius: "18px",
    padding: "25px",
    textAlign: "center",
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow:
      "0 8px 20px rgba(0,0,0,0.25)",
  },

  cardHover: {
    transform: "translateY(-8px) scale(1.03)",
    boxShadow:
      "0 15px 30px rgba(0,0,0,0.4)",
  },

  securityCard: {
    background:
      "linear-gradient(135deg, #22c55e, #16a34a)",
  },

  vulnerabilityCard: {
    background:
      "linear-gradient(135deg, #ef4444, #dc2626)",
  },

  licenseCard: {
    background:
      "linear-gradient(135deg, #f59e0b, #d97706)",
  },

  dependencyCard: {
    background:
      "linear-gradient(135deg, #3b82f6, #2563eb)",
  },

  metricTitle: {
    marginTop: "12px",
    marginBottom: "8px",
    fontSize: "18px",
    fontWeight: "600",
  },

  metricValue: {
    fontSize: "52px",
    margin: 0,
    fontWeight: "bold",
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
    borderRadius: "18px",
    minHeight: "220px",
    boxShadow:
      "0 0 15px rgba(56,189,248,0.12)",
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
    borderRadius: "18px",
    boxShadow:
      "0 0 15px rgba(56,189,248,0.12)",
  },

  graphPlaceholder: {
    height: "250px",
    border: "2px dashed #38bdf8",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#94a3b8",
    marginTop: "15px",
    fontSize: "20px",
  },
};

export default App;