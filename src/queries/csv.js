const BASE_URL = import.meta.env.VITE_DEV_API;

export const postCSV = async (payload) => {
  const res = await fetch(BASE_URL + "csv/clean/", {
    method: "POST",
    body: payload,
  });

  if (!res.ok) {
    throw new Error(`Error: ${res.status} ${res.statusText}`);
  }

  const report = await res.json();

  return report;
};
