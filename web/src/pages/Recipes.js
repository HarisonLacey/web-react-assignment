import { useState, useEffect } from "react";
import { useContextWrapper } from "../cotenxtWrapper/contextWrapper";
const axios = require("axios");

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  let API_HOST = useContextWrapper();
  useEffect(() => {
    async function fecthRecipes() {
      try {
        let res = await axios.get(`${API_HOST}/recipes/`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
        console.log(res.data);
        setRecipes(res.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    fecthRecipes();
  }, [API_HOST]);
  return (
    <div>
      {recipes.map((e) => (
        <p>
          <a href={`/recipes/item?id=${e.id}`}>{e.title}</a>
        </p>
      ))}
    </div>
  );
}
