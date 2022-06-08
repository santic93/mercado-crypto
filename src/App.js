import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ChartPage from "./pages/ChartPage";
import Home from "./pages/Home";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div>
        <div className="estiloTabla">
          <Routes>
            <Route path="/crypto/:id" element={<ChartPage />} />
            <Route index element={<Home />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
