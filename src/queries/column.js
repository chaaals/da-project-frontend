const BASE_URL = import.meta.env.VITE_DEV_API;

export const getColumns = async (reportId) => {
  try {
    const res = await fetch(BASE_URL + `report/${reportId}/column/`, {
      method: "GET",
    }).then((res) => res.json());

    return res;
  } catch (e) {
    console.error(e);
  }
};
