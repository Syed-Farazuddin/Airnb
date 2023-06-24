import { BrowserRouter, Route, Routes } from "react-router-dom";
import Indexpage from "./components/Indexpage";
import LoginPage from "./components/LoginPage";
import Layout from "./components/Layout";
import RegisterPage from "./components/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Account from "./components/Account";

axios.defaults.baseURL = "http://127.0.0.1:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Indexpage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account/:subpage?" element={<Account />} />
            {/* <Route path="/account/bookings" element={<Account />} />
            <Route path="/account/places" element={<Account />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
