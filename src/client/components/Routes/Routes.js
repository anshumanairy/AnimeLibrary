import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import loadable from "@loadable/component";

const HomePage = loadable(() => import("../../containers/Home"));
const VapPage = loadable(() => import("../../containers/VAP"));

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={() => <HomePage />} />
      <Route
        path="/:type(title|manga|character)"
        component={() => <VapPage />}
      />
      <Route render={() => <Redirect to="/404" />} />
    </Switch>
  );
};

export default Routes;
