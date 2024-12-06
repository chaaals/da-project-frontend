const BASE_URL = import.meta.env.VITE_DEV_API;

export const getComments = async (reportId, pageId) => {
  try {
    const res = await fetch(
      BASE_URL + `report/${reportId}/page/${pageId}/comment/`,
      { method: "GET" }
    ).then((res) => res.json());

    return res;
  } catch (e) {
    console.error(e);
  }
};

export const postComment = async ({ reportId, pageId, payload }) => {
  try {
    const res = await fetch(
      BASE_URL + `report/${reportId}/page/${pageId}/comment/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    ).then((res) => res.json());

    return res;
  } catch (e) {
    console.error(e);
  }
};
