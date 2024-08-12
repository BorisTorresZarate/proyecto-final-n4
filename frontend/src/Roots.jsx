import React from "react";
import { Router, Route, Switch } from "wouter";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import ManageIncidence from "./pages/ManageIncidence.jsx";
import CreateIncidence from "./pages/CreateIncidence.jsx";
import ViewIncidence from "./components/dashboard/ViewIncidence.jsx";
import UpdateIncUser from "./pages/UpdateIncUser";
import { useUser } from './services/UserContext';

function Roots() {
  const { userNombre, userType, userId } = useUser();


  return (
    <Router>
      <Switch>
        <Route path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={() => <Dashboard userNombre={userNombre} userType={userType} />} />
        <Route path="/crear-incidencia" component={() => <CreateIncidence userNombre={userNombre} />} />
        <Route path="/gestion-incidencias" component={() => <ManageIncidence userNombre={userNombre} isAdmin={true} />} />
        <Route path="/ver-incidencias" component={() => <ViewIncidence userType={userType} userId={userId} />} />
        <Route path="/actualizar-datos/:id">
          {(params) => <UpdateIncUser params={params} />}
        </Route>
      </Switch>
    </Router>
  );
}

export default Roots;
