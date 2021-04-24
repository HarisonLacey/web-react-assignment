import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useContextWrapper } from "../contextWrapper/contextWrapper";
import { Select } from "../styledComponents/sharedComponents";
import { Link } from "react-router-dom";

export default function AllItems() {
  const [items, setItems] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [type, setType] = useState("");
  const [reload, setReload] = useState(false);
  const [filter, setFilter] = useState("");
  let { id } = useParams();
  let { api } = useContextWrapper();
  useEffect(() => {
    async function fecthItems() {
      try {
        let res = await axios.get(`${api}/${id}/`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
        setItems(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fecthItems();
  }, [api, id, reload]);
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
          <Select
            required
            onChange={(e) => {
              setFilter(e.target.value);
              setSearchItems([]);
              setType("");
            }}
          >
            <option value="" disabled selected>
              filter type
            </option>
            <option value={"Bean Type"}>Bean Type</option>
            <option value={"Brew Method"}>Brew Method</option>
            <option value={"Strength"}>Strength</option>
          </Select>
          {filter === "" && (
            <div>
              <Select
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                required
              >
                <option value="" disabled selected>
                  select filter option
                </option>
              </Select>
            </div>
          )}
          {filter === "Bean Type" && (
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
            </div>
          )}
          {filter === "Brew Method" && (
            <div>
              <Select required id="brew_method" onChange={listFilter}>
                <option value="" disabled selected>
                  brew method
                </option>
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
              </Select>
            </div>
          )}
          {filter === "Strength" && (
            <div>
              <Select required id="tags" onChange={listFilter}>
                <option value="" disabled selected>
                  Strength
                </option>
                <option value={"Light"}>Light</option>
                <option value={"Medium"}>Medium</option>
                <option value={"Strong"}>Strong</option>
                <option value={"Extra Strong"}>Extra Strong</option>
              </Select>
            </div>
          )}
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
              <Link to={`/${id}/${e.id}`}>
                {id === "recipes" && e.title}
                {id === "brewers" && e.name}
              </Link>
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
              <Link to={`/${id}/${e.id}`}>
                {id === "recipes" && e.title}
                {id === "brewers" && e.name}
              </Link>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
