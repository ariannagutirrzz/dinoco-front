import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Products from "../pages/Products";
import Deposits from "../pages/Deposits";
import Clients from "../pages/Clients";
import Users from "../pages/Users";
import Providers from "../pages/Providers";
import Purchases from "../pages/Purchases";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="*" element={<NotFound/>} />
            <Route path="/products" element={<Products/>} />
            <Route path="/deposits" element={<Deposits/>} />
            <Route path="/clients" element={<Clients/>} />
            <Route path="/users" element={<Users/>} />
            <Route path="/providers" element={<Providers/>} />
            <Route path="/purchases" element={<Purchases/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
