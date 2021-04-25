import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContextWrapper } from "../contextWrapper/contextWrapper";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { ItemDisplay, Button } from "../styledComponents/sharedComponents";
import question from "../assets/question.png";
import bean from "../assets/bean.png";
import time from "../assets/clock.png";
import method from "../assets/method.png";
import notes from "../assets/note.png";
import strength from "../assets/strength.png";

// single item page

export default function SingleItem() {
  const [item, setItem] = useState({});
  const [recipes, setRecipes] = useState([]);
  let { api } = useContextWrapper();
  let { type, index } = useParams();
  useEffect(() => {
    async function Item() {
      switch (type) {
        case "recipes":
          try {
            let res = await axios.get(`${api}/recipes/`, {
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
            let res = await axios.get(`${api}/brewers/${index}`, {
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
  }, [api, index, type]);
  return (
    <Container
      style={{
        paddingTop: "50px",
        paddingBottom: "50px",
        overflow: "auto",
        backgroundColor: "whitesmoke",
      }}
      fluid
    >
      <Row noGutters>
        {type === "recipes" && (
          <>
            <Col xs={12} style={{ textAlign: "center" }}>
              <h2 style={{ fontFamily: '"Monoton", cursive' }}>{item.title}</h2>
              <hr style={{ border: "solid 2px" }} />
            </Col>
            <Col xs={12}>
              <Row noGutters>
                <Col xs={4} style={{ textAlign: "right", padding: "3% 0" }}>
                  <img src={question} />
                </Col>
                <Col
                  xs={6}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "3%",
                    fontFamily: "'Monoton', cursive",
                  }}
                >
                  <h2>{item.description}</h2>
                </Col>
                <Col xs={2}></Col>
                <Col xs={4} style={{ textAlign: "right", padding: "3% 0" }}>
                  <img src={bean} />
                </Col>
                <Col
                  xs={6}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "3%",
                    fontFamily: "'Monoton', cursive",
                  }}
                >
                  <h2>{item.bean_type}</h2>
                </Col>
                <Col xs={2}></Col>
                <Col xs={4} style={{ textAlign: "right", padding: "3% 0" }}>
                  <img src={time} />
                </Col>
                <Col
                  xs={6}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "3%",
                    fontFamily: "'Monoton', cursive",
                  }}
                >
                  <h2>{item.brew_time} minutes</h2>
                </Col>
                <Col xs={2}></Col>
                <Col xs={4} style={{ textAlign: "right", padding: "3% 0" }}>
                  <img src={method} />
                </Col>
                <Col
                  xs={6}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "3%",
                    fontFamily: "'Monoton', cursive",
                  }}
                >
                  <h2>{item.brew_method}</h2>
                </Col>
                <Col xs={2}></Col>
                <Col xs={4} style={{ textAlign: "right", padding: "3% 0" }}>
                  <img src={notes} />
                </Col>
                <Col
                  xs={6}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "3%",
                    fontFamily: "'Monoton', cursive",
                  }}
                >
                  <h2>{item.taste_notes}</h2>
                </Col>
                <Col xs={2}></Col>
                <Col xs={4} style={{ textAlign: "right", padding: "3% 0" }}>
                  <img src={strength} />
                </Col>
                <Col
                  xs={6}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "3%",
                    fontFamily: "'Monoton', cursive",
                  }}
                >
                  <h2>{item.tags}</h2>
                </Col>
                <Col xs={2}></Col>
              </Row>
            </Col>
            <Col xs={12}>
              <hr style={{ border: "solid 2px" }} />
            </Col>
            <Col xs={12} style={{ textAlign: "center" }}>
              <Link to={`/brewers/${item.brewer_id}`}>
                <Button height="50px" style={{ width: "30%", height: "50px" }}>
                  Visit Brewer
                </Button>
              </Link>
            </Col>
          </>
        )}
        {type === "brewers" && (
          <>
            <Col xs={12} style={{ textAlign: "center" }}>
              <h2
                style={{
                  fontFamily: '"Monoton", cursive',
                }}
              >
                {item.name}
              </h2>
              <hr style={{ border: "solid 2px" }} />
            </Col>
            <Col xs={12} style={{ textAlign: "center" }}>
              <h2 style={{ fontFamily: '"Monoton", cursive' }}>Recipes</h2>
            </Col>
            <>
              {recipes.map((recipe) => (
                <Col sm={6} md={4} style={{ padding: "10px 0" }}>
                  <Link to={`/recipes/${recipe.id}`}>
                    <ItemDisplay>
                      <h2>{recipe.title}</h2>
                    </ItemDisplay>
                  </Link>
                </Col>
              ))}
            </>
          </>
        )}
      </Row>
    </Container>
  );
}
