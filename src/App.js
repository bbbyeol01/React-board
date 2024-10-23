import React from "react";
import AppRouter from "./routers/Router";
import BoardRouter from "./routers/BoardRouter";
import Nav from "./components/Nav";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Nav />
      <AppRouter />
      <BoardRouter />
      <Footer />
    </>
  );
}

export default App;
