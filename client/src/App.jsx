import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Indexpage from "./components/Indexpage";
import LoginPage from "./components/LoginPage";
import Layout from "./components/Layout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Indexpage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
