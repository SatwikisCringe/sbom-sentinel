import { useEffect, useState } from "react";
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
    // Replace with backend API later
    setScore(82);
    setVulnerabilities(5);
    setLicenseIssues(2);
    setDependencies(50);
  }, []);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logoContainer}>
          <FaShieldAlt size={70} />
          <h1 style={styles.title}>SBOM Sentinel</h1>
        </div>

        <p style={styles.subtitle}>
          Software Supply Chain Risk Analyzer
        </p>
      </div>

      {/* Upload Section */}
      <div style={styles.uploadCard}>
        <h2 style={styles.uploadTitle}>
          📂 Upload SBOM
        </h2>

        <input
          type="file"
          accept=".json,.xml,.csv"
          style={styles.fileInput}
        />
      </div>

      {/* Metric Cards */}
      <div style={styles.metricsGrid}>
        {/* Security */}
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
          <FaShieldAlt size={60} />
          <h3 style={styles.metricTitle}>
            Security Score
          </h3>
          <h1 style={styles.metricValue}>
            {score}
          </h1>
        </div>

        {/* Vulnerabilities */}
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
          <FaBug size={60} />
          <h3 style={styles.metricTitle}>
            Vulnerabilities
          </h3>
          <h1 style={styles.metricValue}>
            {vulnerabilities}
          </h1>
        </div>

        {/* License */}
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
          <FaFileContract size={60} />
          <h3 style={styles.metricTitle}>
            License Issues
          </h3>
          <h1 style={styles.metricValue}>
            {licenseIssues}
          </h1>
        </div>

        {/* Dependencies */}
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
          <FaProjectDiagram size={60} />
          <h3 style={styles.metricTitle}>
            Dependencies
          </h3>
          <h1 style={styles.metricValue}>
            {dependencies}
          </h1>
        </div>
      </div>

      {/* Bottom Panels */}
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
            <li>Upgrade vulnerable packages</li>
            <li>Remove incompatible licenses</li>
            <li>Update outdated dependencies</li>
            <li>Apply available security patches</li>
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
    padding: "30px",
    color: "#fff",
    fontFamily: "Segoe UI, sans-serif",
    background:
      "linear-gradient(135deg, #020617, #0f172a)",
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
    fontSize: "56px",
    fontWeight: "800",
    margin: 0,
    color: "#38bdf8",
    textShadow:
      "0 0 15px rgba(56,189,248,0.6)",
  },

  subtitle: {
    marginTop: "10px",
    fontSize: "22px",
    color: "#cbd5e1",
  },

  uploadCard: {
    background: "#1e293b",
    padding: "35px",
    borderRadius: "24px",
    textAlign: "center",
    marginBottom: "30px",
    boxShadow:
      "0 0 25px rgba(56,189,248,0.15)",
  },

 uploadTitle: {
  fontSize: "36px",
  marginBottom: "20px",
  color: "#38bdf8",
  fontWeight: "700",
  textShadow: "0 0 12px rgba(56,189,248,0.6)",
},

  fileInput: {
    color: "#fff",
    fontSize: "16px",
  },

  metricsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(240px,1fr))",
    gap: "25px",
    marginBottom: "30px",
  },

  metricCard: {
    padding: "30px",
    borderRadius: "24px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.35s ease",
    boxShadow:
      "0 12px 25px rgba(0,0,0,0.35)",
    color: "#fff",
  },

  cardHover: {
    transform: "translateY(-10px) scale(1.05)",
    boxShadow:
      "0 0 35px rgba(255,255,255,0.25)",
  },

  securityCard: {
    background:
      "linear-gradient(135deg,#00c853,#00e676)",
  },

  vulnerabilityCard: {
    background:
      "linear-gradient(135deg,#ff1744,#ff5252)",
  },

  licenseCard: {
    background:
      "linear-gradient(135deg,#ff9100,#ffab40)",
  },

  dependencyCard: {
    background:
      "linear-gradient(135deg,#2979ff,#448aff)",
  },

  metricTitle: {
    marginTop: "15px",
    marginBottom: "10px",
    fontSize: "28px",
    fontWeight: "600",
    color: "#ffffff",
  },

  metricValue: {
    margin: 0,
    fontSize: "72px",
    fontWeight: "800",
    color: "#ffffff",
  },

  contentGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(350px,1fr))",
    gap: "25px",
    marginBottom: "25px",
  },

  panel: {
    background: "#1e293b",
    padding: "25px",
    borderRadius: "24px",
    boxShadow:
      "0 0 20px rgba(56,189,248,0.12)",
  },

  panelTitle: {
    color: "#38bdf8",
    marginBottom: "15px",
  },

  text: {
    color: "#cbd5e1",
    fontSize: "16px",
  },

  list: {
    color: "#cbd5e1",
    lineHeight: "2",
    fontSize: "16px",
  },

  graphPanel: {
    background: "#1e293b",
    padding: "25px",
    borderRadius: "24px",
    boxShadow:
      "0 0 20px rgba(56,189,248,0.12)",
  },

  graphPlaceholder: {
    height: "280px",
    border: "2px dashed #38bdf8",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#94a3b8",
    fontSize: "22px",
    marginTop: "15px",
  },
};

export default App;