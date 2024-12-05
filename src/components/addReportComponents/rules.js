export const rules = {
  scatter: { type: "cartesian", limit: 2, dataTypes: ["NUMBER"] },
  pie: {
    type: "categorical",
    limit: 0,
    dataTypes: ["NUMBER", "BOOLEAN", "STRING"],
  },
  bubble: { type: "cartesian", limit: 2, dataTypes: ["NUMBER"] },
  funnel: {
    type: "categorical",
    limit: 0,
    dataTypes: ["NUMBER", "BOOLEAN", "STRING"],
  },
  stackedbar: {
    type: "categorical",
    limit: 3,
    dataTypes: ["NUMBER", "STRING"],
  },
};
