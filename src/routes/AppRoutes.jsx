import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Products from "../pages/Products";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="*" element={<NotFound/>} />
            <Route path="/products" element={<Products/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
