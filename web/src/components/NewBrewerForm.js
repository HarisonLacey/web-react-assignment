import React, { useState } from "react";
import axios from "axios";
import { useContextWrapper } from "../contextWrapper/contextWrapper";
import { Container, Row, Col } from "react-bootstrap";
import { Form, Button } from "../styledComponents/sharedComponents";

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
        overflow: "auto",
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
            />
            <Button type="submit">Submit</Button>
            <h3>{response}</h3>
          </Form>
        </Col>
        <Col sm={3} lg={4}></Col>
      </Row>
    </Container>
  );
}
