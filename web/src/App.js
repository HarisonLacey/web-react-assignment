import React from "react";
import { Route, Switch } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Landing from "./pages/Landing";
import Layout from "./components/Layout";
import Forms from "./pages/Forms";
import AllItems from "./pages/AllItems";
import SingleItem from "./pages/SingleItem";
import { ContextWrapper } from "./cotenxtWrapper/contextWrapper";

// api url
const API_HOST = "http://localhost:8080";

// global style
const GlobalStyle = createGlobalStyle`
`;

// styled themes
const themes = {
  colors: {
    primary: "red",
    secondary: "blue",
  },
};

export default function App() {
  return (
    <>
      {/* use global styles across website */}
      <GlobalStyle />
      {/* context wrapper to pass down data */}
      <ContextWrapper data={API_HOST}>
        {/* theme provider to pass down styles */}
        <ThemeProvider themes={themes}>
          <Layout>
            <Switch>
              <Route path="/" component={Landing} exact />
              <Route path="/new/:id" component={Forms} />
              <Route path="/:id" component={AllItems} exact />
              <Route path="/:type/:index" component={SingleItem} />
            </Switch>
          </Layout>
        </ThemeProvider>
      </ContextWrapper>
    </>
  );
}
