import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContextWrapper } from "../cotenxtWrapper/contextWrapper";

export default function Landing() {
  return (
    <div>
      <a href="new/brewer"><button>Add New Brewer</button></a>
      <a href="new/recipe"><button>Add New Recipe</button></a>
      <a href="brewers"><button>Brewers</button></a>
      <a href="recipes"><button>Recipes</button></a>
    </div>
  );
}
