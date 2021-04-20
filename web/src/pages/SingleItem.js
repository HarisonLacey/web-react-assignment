import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContextWrapper } from "../cotenxtWrapper/contextWrapper";
const queryString = require("query-string");
const axios = require("axios");

export default function SingleItem() {
  const [item, setItem] = useState({});
  let API_HOST = useContextWrapper();
  let { id } = useParams();
  const { i } = queryString.parse(window.location.search);
  useEffect(() => {
    console.log(id);
    async function fecthRecipes() {
      try {
        let res = await axios.get(`${API_HOST}/${id}/`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
        console.log(res.data[i - 1]);
        setItem(res.data[i - 1]);
      } catch (err) {
        console.log(err.message);
      }
    }
    fecthRecipes();
  }, [API_HOST, id, i]);
  return (
    <div>
      {id === "recipes" && <p>{item.title}</p>}
      {id === "brewers" && <p>{item.name}</p>}
    </div>
  );
}
