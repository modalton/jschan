
function boardCatalogReducer(state = {boards:[]}, action){
  switch (action.type) {
  case 'BOARD_CATALOG_FETCH_SUCCEEDED':
    let catalog = action.payload;
    console.log("catalog = ", catalog);
    return Object.assign(state,{catalog});
  default:
    return state;
  }
}

export default boardCatalogReducer;
