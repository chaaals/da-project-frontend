const BASE_URL = import.meta.env.VITE_DEV_API;

export const postGemini = async (payload) => {
  const { prompt, context } = payload;
  try {
    const res = await fetch(BASE_URL + `gemini?prompt=${prompt}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: context,
    }).then((res) => res.json());

    return res;
  } catch (e) {
    console.error(e);
  }
};
