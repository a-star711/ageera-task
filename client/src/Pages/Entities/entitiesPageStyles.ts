export const entitiesPageStyles = {
  container: {
    width: "100%",
    overflow: "hidden",
  },
  loadingBox: {
    display: "flex",
    justifyContent: "center",
    p: 4,
  },
  errorAlert: {
    my: 2,
  },
  entityList: {
    display: "flex",
    gap: "12px",
    overflowX: "auto",
    pb: 2,
    "&::-webkit-scrollbar": {
      height: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#E0E0E0",
      borderRadius: "3px",
    },
  },
  noEntitiesText: {
    textAlign: "center",
    py: 4,
  },
};
