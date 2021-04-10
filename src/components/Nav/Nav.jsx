import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        Eletronica Heritier
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/main">
              <a className="nav-link" href="#">
                Home
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Settings
            </a>
          </li>
          <li className="nav-item">
            <Link to="/estadisticas">
              <a className="nav-link" href="#">
                Estadisticas
              </a>
            </Link>
          </li>
        </ul>
        <span className="navbar-text">Cierre de periodo</span>
      </div>
    </nav>
  );
};

export default Nav;
