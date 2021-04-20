import { Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Forms from "./pages/Forms";
import Recipes from "./pages/Recipes";
import SingleRecipe from "./pages/SingleRecipe";
import { ContextWrapper } from "./cotenxtWrapper/contextWrapper";

const API_HOST = "http://localhost:8080/";

export default function App() {
  return (
    // wrap app in context wrapper and pass down data
    <ContextWrapper data={API_HOST}>
      <Switch>
        <Route path="/" component={Landing} exact />
        <Route path="/new/:id" component={Forms} />
        <Route path="/recipes" component={Recipes} />
        <Route path="/recipes/:id" component={SingleRecipe} />
      </Switch>
    </ContextWrapper>
  );
}


