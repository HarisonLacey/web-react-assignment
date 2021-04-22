import { Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import React from "react";
import Layout from "./components/Layout";
import Forms from "./pages/Forms";
import AllItems from "./pages/AllItems";
import SingleItem from "./pages/SingleItem";
import { ContextWrapper } from "./cotenxtWrapper/contextWrapper";

const API_HOST = "http://localhost:8080";

export default function App() {
  return (
    // wrap app in context wrapper and pass down data
    <ContextWrapper data={API_HOST}>
      <Layout>
        <Switch>
          <Route path="/" component={Landing} exact />
          <Route path="/new/:id" component={Forms} />
          <Route path="/:id" component={AllItems} exact />
          <Route path="/:type/:index" component={SingleItem} />
        </Switch>
      </Layout>
    </ContextWrapper>
  );
}
