import { NavbarSegmented } from "../components/NavBar/NavbarSegmented";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div style={{ display: "flex", height: "100vh"}}>
      <NavbarSegmented />
      <div style={{ flex: 1, padding: "1rem", overflowY: "auto" }}><Outlet/></div>
    </div>
  );
}