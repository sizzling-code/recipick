import React from "react";
import "../pages/landing_page/landing.css";

interface NavbarProps {
  children?: React.ReactNode; 
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <header className="sticky-header">
      <div className="nav-container">
        <nav className="nav-navBox">
          <div className="nav-nameBox">
            <img className="chef" src="/chef.png" alt="chef's hat" />
            <h3>Recipick</h3>
          </div>
          <div className="cta_btn_box">
            {children}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
