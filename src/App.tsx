import "./App.css";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages";
import AdminPage from "./admin/AdminPage";
import ApartmentPage from "./components/ApartmentPage/ApartmentPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
          path="/oferta/:slug"
          element={<ApartmentPage oferta={""} />}
        />
      <Route path="admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
