import { Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Forms from "./pages/Forms";
import Recipes from "./pages/Recipes";
import SingleRecipe from "./pages/SingleRecipe";

function App() {
  return (
    <Switch>
      <Route path="/" component={Landing} exact />
      <Route path="/new/:id" component={Forms} />
      <Route path="/recipes" component={Recipes} />
      <Route path="/recipes/:id" component={SingleRecipe} />
    </Switch>
  );
}

export default App;
