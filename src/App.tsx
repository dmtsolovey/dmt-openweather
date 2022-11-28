import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import WeatherSummary from "./components/WeatherSummary/WeatherSummary";
import "./App.module.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="location/:id" element={<WeatherSummary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
