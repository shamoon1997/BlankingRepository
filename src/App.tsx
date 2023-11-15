import { Route, Routes } from "react-router-dom";
import { CallbackPage, LoginPage } from "./pages";
import { ProtectedRouter } from "./router";
import MapPopup from "./components/MapPopup";

function App() {
  return (
    <>
      <MapPopup />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/callback" element={<CallbackPage />} />
      </Routes>
      <ProtectedRouter />
    </>
  );
}

export default App;
