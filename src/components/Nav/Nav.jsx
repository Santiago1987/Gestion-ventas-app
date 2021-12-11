import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        Eletronica Heritier{" "}
        <sub style={{ fontSize: "small", fontStyle: "italic" }}>Beta 1.0</sub>
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
              <span className="nav-link" href="#">
                Home
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/settings">
              <span className="nav-link" href="#">
                Settings
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/estadisticas">
              <span className="nav-link" href="#">
                Estadisticas
              </span>
            </Link>
          </li>
        </ul>
        <Link to="/cierre">
          <span className="cierre">Cierre de periodo</span>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
