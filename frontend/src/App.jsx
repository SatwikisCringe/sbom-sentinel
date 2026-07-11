import { useEffect, useState } from "react";
import { getDashboardData } from "./api";

function App() {
  const [score, setScore] = useState(0);
  const [vulnerabilities, setVulnerabilities] = useState(0);
  const [licenseIssues, setLicenseIssues] = useState(0);
  const [dependencies, setDependencies] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getDashboardData();

        setScore(data.security_score);
        setVulnerabilities(data.vulnerabilities);
        setLicenseIssues(data.license_issues);
        setDependencies(data.dependencies);
      } catch (error) {
        console.error("Backend not connected:", error);
      }
    }

    loadData();
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>SBOM Sentinel Dashboard</h1>

      <h2>Security Score: {score}</h2>
      <h2>Vulnerabilities: {vulnerabilities}</h2>
      <h2>License Issues: {licenseIssues}</h2>
      <h2>Dependencies: {dependencies}</h2>
    </div>
  );
}

export default App;