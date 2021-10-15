import { createStore } from "redux";
import reducer from "./reducer";
import { applyMiddleware } from "redux";
// import reducerTwo from "./reducerTwo";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(reducer, composeWithDevTools(applyMiddleware())); // ---> esto cuando solo es un reducer

// const rootReducer = combineReducers({
//   reducer,
// });

// export default createStore(reducer); //con un reducer
export default store;
