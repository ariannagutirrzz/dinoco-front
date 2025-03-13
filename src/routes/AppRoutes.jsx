import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Products from "../pages/Products";
import Deposits from "../pages/Deposits";
import Clients from "../pages/Clients";
import Users from "../pages/Users";
import Providers from "../pages/Providers";
import Purchases from "../pages/Purchases";
import Sales from "../pages/Sales";
import Charts from "../pages/Charts";
import Auth from "../pages/Auth";
import Refunds from "../pages/Refunds";
import About from "../pages/About";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/deposits" element={<Deposits />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/users" element={<Users />} />
            <Route path="/providers" element={<Providers />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/refunds" element={<Refunds />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
