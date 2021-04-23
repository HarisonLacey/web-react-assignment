import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContextWrapper } from "../contextWrapper/contextWrapper";
import axios from "axios";

export default function SingleItem() {
  const [item, setItem] = useState({});
  const [recipes, setRecipes] = useState([]);
  let API_HOST = useContextWrapper();
  let { type, index } = useParams();
  useEffect(() => {
    async function Item() {
      switch (type) {
        case "recipes":
          try {
            let res = await axios.get(`${API_HOST}/recipes/`, {
              headers: {
                "Access-Control-Allow-Origin": "*",
              },
            });
            let itemFind = await res.data.find(
              ({ id }) => id === parseInt(index)
            );
            setItem(itemFind);
          } catch (err) {
            console.log(err.message);
          }
          break;
        case "brewers":
          try {
            let res = await axios.get(`${API_HOST}/brewers/${index}`, {
              headers: {
                "Access-Control-Allow-Origin": "*",
              },
            });
            setItem(res.data);
            console.log(res.data);
            setRecipes(res.data.recipes);
          } catch (err) {
            console.log(err.message);
          }
          break;
        default:
          return;
      }
    }
    Item();
  }, [API_HOST, index, type]);
  return (
    <div>
      {type === "recipes" && (
        <div>
          <p>{item.title}</p>
          <p>
            <a href={`/brewers/${item.brewer_id}`}>Visit Brewer</a>
          </p>
        </div>
      )}
      {type === "brewers" && (
        <div>
          <p>{item.name}</p>
          <ul>
            {recipes.map((recipe) => (
              <li>
                <a href={`/recipes/${recipe.id}`}>{recipe.title}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
