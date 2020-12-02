import React from "react";

import Inicio from "./views/InicioView";
import EmpleadosView from "./views/EmpleadosView";
import VehiculosView from "./views/VehiculosView";
import ReciboView from "./views/ReciboView";
import loginView from "./views/LoginView";
import logo from "./img/logo.png";

import "./styles/index.css";
import Swal from "sweetalert2";

import { Navbar, Nav, Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

function App() {
  const handleLogout = async () => {
    try {
      const respCerrar = await Swal.fire({
        title: "Salir",
        icon: "info",
        text: "¿Desea salir de la sesión?",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      });
      if (!respCerrar) {
        return;
      }

      localStorage.clear();
      window.location.pathname = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <Navbar className="Nav-Bar" expand="lg">
        <Navbar.Brand className="logo" href="/">
          <img src={logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="Links" to="/">
              Home
            </Link>
            {localStorage.getItem("token") && (
              <Nav>
                <Link className="Links" to="/empleados">
                  Empleados
                </Link>
                <Link className="Links" to="/vehiculos">
                  Vehiculos
                </Link>
                <Link className="Links" to="/recibo">
                  Recibo
                </Link>
              </Nav>
            )}
          </Nav>

          {!localStorage.getItem("token") && (
            <nav className="ml-auto">
              <Link to="/administradores/login">
                <Button variant="primary">Ingresar</Button>
              </Link>
            </nav>
          )}
          {localStorage.getItem("token") && (
            <nav className="ml-auto">
              <Link to="/">
                <Button variant="danger" onClick={handleLogout}>
                  Salir
                </Button>
              </Link>
            </nav>
          )}
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route path="/administradores/login" component={loginView} />
        <Route exact={true} path="/" component={Inicio} />
        {
          localStorage.getItem('token')?
          <div>
            <Route path="/empleados" component={EmpleadosView} />
            <Route path="/vehiculos" component={VehiculosView} />
            <Route path="/recibo" component={ReciboView} />
          </div>:<Redirect to="/administradores/login"/>
        }
      </Switch>
    </Router>
  );
}

export default App;
