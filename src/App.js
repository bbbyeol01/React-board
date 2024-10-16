import React from "react";
import AppRouter from "./routers/Router";
import BoardRouter from "./routers/BoardRouter";
import Nav from "./components/Nav";
import { BrowserRouter } from "react-router-dom";
import GoTop from "./components/GoTop";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <GoTop />
        <AppRouter />
        <BoardRouter />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
