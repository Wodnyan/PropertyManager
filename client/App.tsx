import React from "react";
import Views from "./views/";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Views />
    </Provider>
  );
}

export default App;
