import React from "react";

import Inicio from "./views/InicioView";
import EmpleadosView from "./views/EmpleadosView";
import VehiculosView from "./views/VehiculosView";
import ReciboView from "./views/ReciboView";

import { Navbar, Nav, } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Clean Car</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Link to="/">Inicio</Link>
            <Link to="/empleados">Empleados</Link>
            <Link to="/vehiculos">Vehiculos</Link>
            <Link to="/recibo">Recibo</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route exact={true} path="/" component = {Inicio}/>
        <Route path="/empleados" component = {EmpleadosView}/>
        <Route path="/vehiculos" component = {VehiculosView}/>
        <Route path="/recibo" component = {ReciboView}/>
      </Switch>


    </Router>
  );
}

export default App;
