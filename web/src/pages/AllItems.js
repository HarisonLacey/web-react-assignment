import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useContextWrapper } from "../contextWrapper/contextWrapper";
import {
  Select,
  Button,
  ItemDisplay,
} from "../styledComponents/sharedComponents";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

// page to display either all the brewers or all the recipes depending on url id

export default function AllItems() {
  const [items, setItems] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [type, setType] = useState("");
  const [reload, setReload] = useState(false);
  const [filter, setFilter] = useState("");
  // get url id from params
  const { id } = useParams();
  // get api url from context
  const { api } = useContextWrapper();
  // fetch either all the brewers or recipes depending on url params
  useEffect(() => {
    async function fecthItems() {
      try {
        const res = await axios.get(`${api}/${id}/`, {
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
  useEffect(() => {
    setSearchItems([]);
    setType("");
  }, [id]);
  // function to filter items
  function listFilter(e) {
    switch (id) {
      // filter for recipes
      case "recipes":
        let array = [];
        items.forEach((recipe) => {
          if (recipe[e.target.id] === e.target.value) array.push(recipe);
        });
        setSearchItems(array);
        setType(e.target.id);
        break;
      // filter for brewers
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
    <Container
      style={{
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "whitesmoke",
        overflow: "auto",
      }}
      fluid
    >
      <Row noGutters>
        <Col xs={12}>
          <h2>{id}</h2>
          <hr style={{ border: "solid 2px" }} />
        </Col>
        {/* filter options for recipes */}
        <Col md={8} lg={6}>
          {id === "recipes" && (
            <>
              {/* set filter type */}
              <Select
                size="1.2em"
                inline
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
                <Select
                  size="1.2em"
                  inline
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                  required
                >
                  <option value="" disabled selected>
                    select filter first
                  </option>
                </Select>
              )}
              {filter === "Bean Type" && (
                // filter by bean type
                <Select
                  size="1.2em"
                  inline
                  required
                  id="bean_type"
                  onChange={listFilter}
                >
                  <option value="" disabled selected>
                    bean type
                  </option>
                  <option value={"Robusta"}>Robusta</option>
                  <option value={"Liberica"}>Liberica</option>
                  <option value={"Arabica"}>Arabica</option>
                  <option value={"Other"}>Other</option>
                </Select>
              )}
              {filter === "Brew Method" && (
                // filter by brew method
                <Select
                  size="1.2em"
                  inline
                  required
                  id="brew_method"
                  onChange={listFilter}
                >
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
              )}
              {filter === "Strength" && (
                // filter by strength
                <Select
                  size="1.2em"
                  inline
                  required
                  id="tags"
                  onChange={listFilter}
                >
                  <option value="" disabled selected>
                    Strength
                  </option>
                  <option value={"Light"}>Light</option>
                  <option value={"Medium"}>Medium</option>
                  <option value={"Strong"}>Strong</option>
                  <option value={"Extra Strong"}>Extra Strong</option>
                </Select>
              )}
              {/* reset page */}
              <Button
                style={{ width: "20%", border: "none" }}
                onClick={() => {
                  setSearchItems([]);
                  setType("");
                }}
              >
                Reset
              </Button>
            </>
          )}
          {/* filter options for brewers */}
          {id === "brewers" && (
            // filter ascending or descending alphabetically
            <>
              <Select size="1.2em" inline required id="A" onChange={listFilter}>
                <option value="" disabled selected>
                  sort
                </option>
                <option value={"A"}>A - Z</option>
                <option value={"Z"}>Z - A</option>
              </Select>
              <Button
                style={{ width: "20%", border: "none" }}
                onClick={() => (reload ? setReload(false) : setReload(true))}
              >
                Reset
              </Button>
            </>
          )}
        </Col>
        <Col md={2} lg={3}></Col>
        <Col md={2} lg={3}></Col>
        <Col xs={12}></Col>
        {/* display items section */}
        {searchItems.length === 0 && type === "" && (
          <>
            {items.map((e) => (
              <Col sm={6} md={4} style={{ padding: "10px 0" }}>
                <Link to={`/${id}/${e.id}`}>
                  <ItemDisplay>
                    <h2>
                      {id === "recipes" && e.title}
                      {id === "brewers" && e.name}
                    </h2>
                  </ItemDisplay>
                </Link>
              </Col>
            ))}
          </>
        )}
        {searchItems.length === 0 && type !== "" && (
          <div>
            <h3 style={{ fontFamily: '"Monoton", cursive' }}>No results</h3>
          </div>
        )}
        {searchItems.length !== 0 && (
          <>
            {searchItems.map((e) => (
              <Col sm={6} md={4} style={{ padding: "10px 0" }}>
                <Link to={`/${id}/${e.id}`}>
                  <ItemDisplay>
                    <h2>
                      {id === "recipes" && e.title}
                      {id === "brewers" && e.name}
                    </h2>
                  </ItemDisplay>
                </Link>
              </Col>
            ))}
          </>
        )}
      </Row>
    </Container>
  );
}
