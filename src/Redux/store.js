import { createStore } from "redux";
import { rootred } from "./rootReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
const store = createStore(rootred,composeWithDevTools());
export default store;