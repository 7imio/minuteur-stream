import { BrowserRouter, Routes, Route } from "react-router-dom";
import TimerPage from "./TimerPage";
import TimerConfigurator from "./TimerCOnfigurator";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<TimerConfigurator />} />
      <Route path="/minuteur/:seconds" element={<TimerPage />} />
      <Route
        path="*"
        element={<div>Ajoute une durée dans l'URL (ex: /600)</div>}
      />
    </Routes>
  </BrowserRouter>
);

export default App;
