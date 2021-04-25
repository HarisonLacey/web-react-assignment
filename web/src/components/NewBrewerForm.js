import React, { useState } from "react";
import axios from "axios";
import { useContextWrapper } from "../contextWrapper/contextWrapper";
import { Container, Row, Col } from "react-bootstrap";
import { Form, Button } from "../styledComponents/sharedComponents";

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
    <Container style={{ padding: "50px 0 0", backgroundColor: "whitesmoke", height: "470px" }} fluid>
      <Row noGutters>
        <Col sm={3} lg={4}></Col>
        <Col sm={6} lg={4}>
          <Form onSubmit={formHandle}>
            <input
              placeholder="Brewer Name"
              onChange={(e) => setName(e.target.value)}
            />
            <Button type="submit">Submit</Button>
            <p>{response}</p>
          </Form>
        </Col>
        <Col sm={3} lg={4}></Col>
      </Row>
    </Container>
  );
}
