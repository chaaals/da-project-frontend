import { chartEnums } from "../hooks/useChart";

const BASE_URL = import.meta.env.VITE_DEV_API;

const getChartData = async (reportId, labels) => {
  try {
    const res = await fetch(
      BASE_URL + `report/${reportId}/column?labels=${labels}`,
      { method: "GET" }
    ).then((res) => res.json());

    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getPages = async (reportId) => {
  try {
    const res = await fetch(BASE_URL + `report/${reportId}/page/`, {
      method: "GET",
    }).then((res) => res.json());

    const pages = await Promise.all(
      res.map(async (page) => {
        const chartData = await getChartData(reportId, page.labels);

        if (page.chart_type === chartEnums.scatter) {
          const [x, y] = page.labels;
          return {
            ...page,
            chartData: {
              x: chartData.filter(({ label }) => label === x),
              y: chartData.filter(({ label }) => label === y),
            },
          };
        }
        if (page.chart_type === chartEnums.pie) {
          return {
            ...page,
            chartData: {
              data: chartData,
            },
          };
        }
        if (page.chart_type === chartEnums.bubble) {
          const [x, y, r] = page.labels;
          return {
            ...page,
            chartData: {
              x: chartData.filter(({ label }) => label === x),
              y: chartData.filter(({ label }) => label === y),
              r: chartData.filter(({ label }) => label === r),
            },
          };
        }
        if (page.chart_type === chartEnums.funnel) {
          return {
            ...page,
            chartData: {
              data: chartData,
            },
          };
        }
        if (page.chart_type === chartEnums.stackedbar) {
          const [category, col1, col2] = page.labels;
          return {
            ...page,
            chartData: {
              category: chartData.filter(({ label }) => label === category),
              col1: chartData.filter(({ label }) => label === col1),
              col2: chartData.filter(({ label }) => label === col2),
            },
          };
        }
      })
    ).then((val) => val);

    console.log({ pages });
    return pages;
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
