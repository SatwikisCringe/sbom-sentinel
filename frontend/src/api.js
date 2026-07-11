const API_URL = "http://127.0.0.1:8000";

export async function getDashboardData() {
  const response = await fetch(`${API_URL}/dashboard`);
  return await response.json();
}