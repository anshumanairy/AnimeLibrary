import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import loadable from "@loadable/component";

const HomePage = loadable(() => import("../../containers/Home"));

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={() => <HomePage />} />
      <Route render={() => <Redirect to="/404" />} />
    </Switch>
  );
};

export default Routes;
