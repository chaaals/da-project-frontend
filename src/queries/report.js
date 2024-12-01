const BASE_URL = import.meta.env.VITE_DEV_API;

export const getReports = async () => {
  const res = await fetch(BASE_URL + "report", {
    method: "GET",
    mode: "no-cors",
  });
  return await res.json();
};

export const getReport = async (id) => {
  const res = await fetch(BASE_URL + `report/${id}`, {
    method: "GET",
    mode: "no-cors",
  });
  return await res.json();
};

export const postReport = async (payload) => {
  const res = await fetch(BASE_URL + "report", {
    method: "GET",
    "Content-Type": "application/json",
    body: payload,
    mode: "no-cors",
  });

  if (!res.ok) {
    throw new Error(`Error: ${res.status} ${res.statusText}`);
  }

  const report = await res.json();

  return report;
};
