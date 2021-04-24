import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <Link to="/new/brewer">
        <button>Add New Brewer</button>
      </Link>
      <Link to="/new/recipe">
        <button>Add New Recipe</button>
      </Link>
      <Link to="/brewers">
        <button>Brewers</button>
      </Link>
      <Link to="/recipes">
        <button>Recipes</button>
      </Link>
    </div>
  );
}
