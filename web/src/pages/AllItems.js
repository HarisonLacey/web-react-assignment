import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useContextWrapper } from "../cotenxtWrapper/contextWrapper";

export default function AllItems() {
  const [items, setItems] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [type, setType] = useState("");
  let { id } = useParams();
  let API_HOST = useContextWrapper();
  useEffect(() => {
    console.log(searchItems);
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
  }, [API_HOST]);
  function listFilter(e) {
    let array = [];
    items.forEach((recipe) => {
      if (recipe[e.target.id] === e.target.value) array.push(recipe);
    });
    console.log(array);
    setSearchItems(array);
    setType(e.target.value);
  }
  return (
    <div>
      {/* filter functionality */}
      {id === "recipes" && (
        <div>
          <select id="bean_type" onChange={listFilter}>
            <option value="">bean type</option>
            <option value={"Robusta"}>Robusta</option>
            <option value={"Liberica"}>Liberica</option>
            <option value={"Arabica"}>Arabica</option>
            <option value={"Other"}>Other</option>
          </select>
          <select id="brew_time" onChange={listFilter}>
            <option value="">brew time</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
          <select id="brew_method" onChange={listFilter}>
            <option value="">brew method</option>
            <option value={"French Press"}>French Press</option>
            <option value={"Drip"}>Drip</option>
            <option value={"Pour Over"}>Pour Over</option>
            <option value={"Cold Brew"}>Cold Brew</option>
            <option value={"Cold Brew Bottle"}>Cold Brew Bottle</option>
            <option value={"Siphon"}>Siphon</option>
            <option value={"AeroPress"}>AeroPress</option>
            <option value={"Bialetti"}>Bialetti</option>
            <option value={"Chemex"}>Chemex</option>
            <option value={"Espresso"}>Expresso</option>
            <option value={"Milk & Art"}>Milk & Art</option>
            <option value={"Nel Drip"}>Nel Drip</option>
            <option value={"Iced"}>Iced</option>
            <option value={"Other"}>Other</option>
          </select>
          <select id="tags" onChange={listFilter}>
            <option value="">tags</option>
            <option value={"light"}>light</option>
            <option value={"medium"}>medium</option>
            <option value={"strong"}>strong</option>
            <option value={"extra strong"}>extra strong</option>
          </select>
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
      {/* ------------------------------------- */}

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
