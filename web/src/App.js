import React from "react";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, themes } from "./styledComponents/globalStyles";
import Landing from "./pages/Landing";
import Layout from "./components/Layout";
import Forms from "./pages/Forms";
import AllItems from "./pages/AllItems";
import SingleItem from "./pages/SingleItem";
import DeleteItem from "./pages/Delete";
import { ContextWrapper } from "./cotenxtWrapper/contextWrapper";

// api url
const API_HOST = "http://localhost:8080";

export default function App() {
  return (
    <>
      {/* use global styles across website */}
      <GlobalStyle />
      {/* context wrapper to pass down data */}
      <ContextWrapper data={API_HOST}>
        {/* theme provider to pass down styles */}
        <ThemeProvider theme={themes}>
          <Layout>
            <Switch>
              <Route path="/" component={Landing} exact />
              <Route path="/new/:id" component={Forms} exact/>
              <Route path="/:id" component={AllItems} exact/>
              <Route path="/item/delete" component={DeleteItem} exact/>
              <Route path="/:type/:index" component={SingleItem} exact/>
            </Switch>
          </Layout>
        </ThemeProvider>
      </ContextWrapper>
    </>
  );
}
