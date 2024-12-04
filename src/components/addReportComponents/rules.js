export const rules = {
  scatter: { type: "cartesian", limit: 2, dataTypes: ["NUMBER"] },
  pie: {
    type: "categorical",
    limit: 0,
    dataTypes: ["NUMBER", "BOOLEAN"],
  },
  bubble: { type: "cartesian", limit: 2, dataTypes: ["NUMBER"] },
  funnel: { type: "categorical", limit: 0, dataTypes: ["NUMBER"] },
  stackedbar: { limit: 3, dataTypes: ["NUMBER"] },
};
