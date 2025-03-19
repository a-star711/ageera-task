export const entitiesCardStyle = {
  container: {
    width: 364.6,
    height: 160,
    borderRadius: "4px",
    boxShadow: "0px 10px 20px rgba(18, 38, 63, 0.08)",
    p: "20px 24px",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    transition: "transform 0.2s ease",
    "&:hover": {
      transform: "translateY(-2px)",
    },
    gap: "2px",
  },
  card: {
    p: 0,
    height: "100%",
    display: "flex",
    gap: "30px",
    overflow: "hidden",
  },
  heading: {
    fontSize: 14,
    fontWeight: 500,
    color: "#12263F",
    padding: "10px 0px",
  },
  label: { fontSize: 14, color: "#6B7C93" },
  metricValue: {
    fontSize: 14,
    fontWeight: 500,
    color: "#000000",
  },
};
