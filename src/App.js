import React from "react";

import Inicio from "./views/InicioView";
import EmpleadosView from "./views/EmpleadosView";
import VehiculosView from "./views/VehiculosView";
import ReciboView from "./views/ReciboView";
import logo from './img/logo.png'

import { Navbar, Nav,Image } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



function App() {
  return (
    <Router>
      <Navbar className="Nav-Bar"  expand="lg">
        <Navbar.Brand className="logo" href="/"><img src= {logo}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Link className="Links" to="/">Home</Link>
            <Link className="Links" to="/empleados">Empleados</Link>
            <Link className="Links" to="/vehiculos">Vehiculos</Link>
            <Link className="Links" to="/recibo">Recibo</Link>
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
