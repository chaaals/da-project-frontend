const BASE_URL = import.meta.env.VITE_DEV_API;

export const getPages = async (reportId) => {
  try {
    const res = await fetch(BASE_URL + `${reportId}/page/`, {
      method: "GET",
    }).then((res) => res.json());

    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getPage = async (reportId, pageId) => {
  try {
    const res = await fetch(BASE_URL + `${reportId}/page/${pageId}/`, {
      method: "GET",
    }).then((res) => res.json());

    return res;
  } catch (e) {
    console.error(e);
  }
};

export const postPage = async (payload) => {
  const { reportId, data } = payload;
  const res = await fetch(BASE_URL + `report/${reportId}/page/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Error: ${res.status} ${res.statusText}`);
  }

  const report = await res.json();

  return report;
};
