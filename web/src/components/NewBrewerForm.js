import React, { useState } from "react";
import axios from "axios";
import { useContextWrapper } from "../contextWrapper/contextWrapper";
import { Container, Row, Col } from "react-bootstrap";
import { Form } from "../styledComponents/sharedComponents";

// new brewer form

export default function NewBrewerForm() {
  const [name, setName] = useState();
  const [response, setResponse] = useState();
  let { api } = useContextWrapper();
  // set name and response and fetch brewer save api
  async function formHandle(e) {
    e.preventDefault();
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
    // new brewer save form
    <Container fluid>
      <Row noGutters>
        <Col lg={4}></Col>
        <Col xs={12} lg={4}>
          <Form onSubmit={formHandle}>
            <input
              placeholder="Brewer Name"
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">Submit</button>
            <p>{response}</p>
          </Form>
        </Col>
        <Col lg={4}></Col>
      </Row>
    </Container>
  );
}
