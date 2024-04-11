import React from "react";
import PageRoute from "./Screens/PageRoute/Pages";
import { Toaster } from "react-hot-toast";import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/Store";




const App = () => {
  return (
    <div>
      <Provider store={store}>
      <BrowserRouter basename="/demo_1">
      <PageRoute />
      </BrowserRouter>
      </Provider>
      <Toaster />
    </div>
  );
};

export default App;
