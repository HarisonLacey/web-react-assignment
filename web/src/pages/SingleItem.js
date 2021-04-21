import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContextWrapper } from "../cotenxtWrapper/contextWrapper";
import axios from "axios";

export default function SingleItem() {
  const [item, setItem] = useState({});
  let API_HOST = useContextWrapper();
  let { type, id } = useParams();
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
            setItem(res.data[id - 1]);
          } catch (err) {
            console.log(err.message);
          }
          break;
        case "brewers":
          try {
            let res = await axios.get(`${API_HOST}/brewers/${id}`, {
              headers: {
                "Access-Control-Allow-Origin": "*",
              },
            });
            setItem(res.data);
          } catch (err) {
            console.log(err.message);
          }
          break;
        default:
          return;
      }
    }
    Item();
  }, [API_HOST, id, type]);
  return (
    <div>
      {type === "recipes" && <p>{item.title}</p>}
      {type === "brewers" && <p>{item.name}</p>}
    </div>
  );
}
