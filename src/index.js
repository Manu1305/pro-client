import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Component/App";
import { Provider } from "react-redux";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { persistor, store } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router } from 'react-router-dom';



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>

        <App />
        {/* <DashHome /> */}

        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Router>
    </PersistGate>
  </Provider>
);
