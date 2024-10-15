import React from "react";
import AppRouter from "./router";
import Nav from "./components/Nav";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <AppRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
