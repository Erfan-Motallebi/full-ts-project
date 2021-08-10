import React from "react";
import "./App.css";
import Todos from "./components/Todos";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Todos />
      </div>
    </Provider>
  );
}

export default App;
