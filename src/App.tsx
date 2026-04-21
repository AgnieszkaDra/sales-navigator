import "./App.css";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages";
import AdminPage from "./admin/AdminPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
