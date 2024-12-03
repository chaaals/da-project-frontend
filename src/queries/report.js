const BASE_URL = import.meta.env.VITE_DEV_API;

export const getReports = async () => {
  try {
    const res = await fetch(BASE_URL + "report/", {
      method: "GET",
    }).then((res) => res.json());

    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getReport = async (id) => {
  try {
    const res = await fetch(BASE_URL + `report/${id}/`, {
      method: "GET",
    }).then((res) => res.json());

    return res;
  } catch (e) {
    console.error(e);
  }
};

export const postReport = async (payload) => {
  const res = await fetch(BASE_URL + "report/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Error: ${res.status} ${res.statusText}`);
  }

  const report = await res.json();

  return report;
};
