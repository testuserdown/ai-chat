import { Outlet } from "react-router-dom";
import "./layout.css";
import Navbar from "../navbar";

export const Layout = () => {
  return (
    <div className="w100 df fdc aic app-container">
      <Navbar />
      <Outlet />
    </div>
  );
};
