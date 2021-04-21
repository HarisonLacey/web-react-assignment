import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useContextWrapper } from "../cotenxtWrapper/contextWrapper";

export default function AllItems() {
  const [items, setItems] = useState([]);
  let { id } = useParams();
  let API_HOST = useContextWrapper();
  useEffect(() => {
    async function fecthRecipes() {
      try {
        let res = await axios.get(`${API_HOST}/${id}/`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
        setItems(res.data);
        console.log(res.data)
      } catch (err) {
        console.log(err.message);
      }
    }
    fecthRecipes();
  }, [API_HOST]);
  return (
    <div>
      {items.map((e) => (
        <p>
          <a href={`${id}/${e.id}`}>
            {id === "recipes" && e.title}
            {id === "brewers" && e.name}
          </a>
        </p>
      ))}
    </div>
  );
}
