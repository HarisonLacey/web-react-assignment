import React, { useState } from "react";
import axios from "axios";
import { useContextWrapper } from "../contextWrapper/contextWrapper";
import { Container, Row, Col } from "react-bootstrap";
import { Form, Button } from "../styledComponents/sharedComponents";
import { Link } from "react-router-dom";

// new brewer signup form

export default function NewBrewerForm() {
  const [name, setName] = useState();
  const [response, setResponse] = useState();
  // get api url from context
  const { api } = useContextWrapper();
  // set name and response and fetch brewer save api url
  async function formHandle(e) {
    e.preventDefault();
    setResponse("One second...");
    try {
      await axios.post(
        `${api}/brewers/`,
        {
          name: name,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      setResponse("Brewer saved!");
    } catch (err) {
      console.log(err.message);
      setResponse("Brewer already exists!");
    }
  }
  return (
    <Container
      style={{
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "whitesmoke",
        height: "500px",
        textAlign: "center",
      }}
      fluid
    >
      <Row noGutters>
        <Col sm={3} lg={4}></Col>
        <Col sm={6} lg={4}>
          <Form onSubmit={formHandle}>
            <input
              placeholder="Brewer Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Button type="submit">Submit</Button>
            <h3 style={{ margin: "0 auto" }}>{response}</h3>
          </Form>
        </Col>
        <Col sm={3} lg={4}></Col>
        <Col xs={12} style={{ textAlign: "center", paddingTop: "50px" }}>
          {response === "Brewer saved!" && (
            <Link to="/new/recipe">
              <Button height="50px" style={{ width: "30%" }}>
                Create a Recipe
              </Button>
            </Link>
          )}
        </Col>
      </Row>
    </Container>
  );
}
