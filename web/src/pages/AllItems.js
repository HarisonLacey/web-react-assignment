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
import thumbnail from "../assets/thumbnail.jpg";

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
  useEffect(() => {
    setSearchItems([]);
    setType("");
  }, [id]);
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
    <Container
      style={{ paddingTop: "50px", backgroundColor: "whitesmoke" }}
      fluid
    >
      <Row noGutters>
        {/* filter options for recipes */}
        <Col md={8} lg={6}>
          {id === "recipes" && (
            <>
              <Select
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
                  inline
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                  required
                >
                  <option value="" disabled selected>
                    select filter option
                  </option>
                </Select>
              )}
              {filter === "Bean Type" && (
                <Select inline required id="bean_type" onChange={listFilter}>
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
                <Select inline required id="brew_method" onChange={listFilter}>
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
                <Select inline required id="tags" onChange={listFilter}>
                  <option value="" disabled selected>
                    Strength
                  </option>
                  <option value={"Light"}>Light</option>
                  <option value={"Medium"}>Medium</option>
                  <option value={"Strong"}>Strong</option>
                  <option value={"Extra Strong"}>Extra Strong</option>
                </Select>
              )}
              <Button
                style={{ width: "20%" }}
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
            <>
              <Select inline required id="A" onChange={listFilter}>
                <option value="" disabled selected>
                  sort
                </option>
                <option value={"A"}>A - Z</option>
                <option value={"Z"}>Z - A</option>
              </Select>
              <Button
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
            <p>No results</p>
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
