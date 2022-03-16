import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Login from "./components/common/Login";
import Profile from "./components/common/Profile";
import Navbar from "./components/templates/Navbar";
import Profedit from "./components/common/Profedit";
import Food_dash from "./components/common/Food_dash";
import Addfood from "./components/common/Addfood";
import Buy_food from "./components/common/Buy_food";
import Buy_myorders from "./components/common/Buy_myorders";
import Stat from "./components/common/Stat";
// Vendor_orders
import Vendor_orders from "./components/common/Vendor_orders";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profedit" element={<Profedit />} />
          <Route path="food_dash" element={<Food_dash />} />
          <Route path="addfood" element={<Addfood />} />
          <Route path="vendor_orders" element={<Vendor_orders />} />
          <Route path="buy_food" element={<Buy_food />} />
          <Route path="buy_myorders" element={<Buy_myorders />} />
          <Route path="stat" element={<Stat />} />
          {/* Vendor_orders */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
