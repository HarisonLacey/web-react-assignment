import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useContextWrapper } from "../cotenxtWrapper/contextWrapper";
import { Select } from "../styledComponents/sharedComponents";

export default function AllItems() {
  const [items, setItems] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [type, setType] = useState("");
  const [reload, setReload] = useState(false);
  let { id } = useParams();
  let API_HOST = useContextWrapper();
  useEffect(() => {
    async function fecthItems() {
      try {
        let res = await axios.get(`${API_HOST}/${id}/`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
        setItems(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    fecthItems();
  }, [API_HOST, id, reload]);
  function listFilter(e) {
    switch (id) {
      case "recipes":
        let array = [];
        items.forEach((recipe) => {
          if (recipe[e.target.id] === e.target.value) array.push(recipe);
        });
        setSearchItems(array);
        setType(e.target.id);
        break;
      case "brewers":
        setSearchItems([]);
        setType("");
        e.target.value === "A"
          ? setItems(
              items.sort((a, b) =>
                a.name > b.name ? 1 : b.name > a.name ? -1 : 0
              )
            )
          : setItems(
              items.sort((a, b) =>
                a.name > b.name ? -1 : b.name > a.name ? 1 : 0
              )
            );
        break;
      default:
        return;
    }
  }
  return (
    <div>
      {id === "recipes" && (
        <div>
          <Select required id="bean_type" onChange={listFilter}>
            <option value="" disabled selected>
              bean type
            </option>
            <option value={"Robusta"}>Robusta</option>
            <option value={"Liberica"}>Liberica</option>
            <option value={"Arabica"}>Arabica</option>
            <option value={"Other"}>Other</option>
          </Select>
          <button
            onClick={() => {
              setSearchItems([]);
              setType("");
            }}
          >
            Reset
          </button>
        </div>
      )}
      {id === "brewers" && (
        <div>
          <Select required id="A" onChange={listFilter}>
            <option value="" disabled selected>
              sort
            </option>
            <option value={"A"}>A - Z</option>
            <option value={"Z"}>Z - A</option>
          </Select>
          <button onClick={() => (reload ? setReload(false) : setReload(true))}>
            Reset
          </button>
        </div>
      )}
      {searchItems.length === 0 && type === "" && (
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
      )}
      {searchItems.length === 0 && type !== "" && (
        <div>
          <p>No results</p>
        </div>
      )}
      {searchItems.length !== 0 && (
        <div>
          {searchItems.map((e) => (
            <p>
              <a href={`${id}/${e.id}`}>
                {id === "recipes" && e.title}
                {id === "brewers" && e.name}
              </a>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
