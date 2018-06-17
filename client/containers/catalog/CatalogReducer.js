function boardCatalogReducer(state = { catalog: [] }, action) {
  switch (action.type) {
    case "CATALOG_FETCH_SUCCEEDED":
      let catalog = action.payload;
      return { ...state, catalog };
    default:
      return state;
  }
}

export default boardCatalogReducer;
