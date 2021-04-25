import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import banner from "../assets/banner.jpg";
import man from "../assets/man.png";
import earth from "../assets/earth.png";
import cup from "../assets/cup.png";

export default function Landing() {
  return (
    <Container style={{ padding: "0" }} fluid>
      <Row noGutters>
        <Col xs={12}>
          <div
            style={{
              backgroundImage: `url(${banner}`,
              height: "550px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          ></div>
        </Col>
        <Col
          md={6}
          style={{
            height: "400px",
            color: "#ffefa0",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            padding: "2%",
          }}
        >
          <h3 style={{ fontSize: "2.3em", fontFamily: "'Monoton', cursive" }}>
            At Brewers Union our mission is simple;
            <br />
            <br />
            Provide a space for coffee brewers to share their creations with the
            world.
          </h3>
        </Col>
        <Col
          md={6}
          style={{
            height: "400px",
            backgroundColor: "#ffefa0",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Row noGutters>
            <Col xs={4} style={{ textAlign: "right", padding: "3% 0" }}>
              <img src={man} />
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
              <h2>Become a Brewer</h2>
            </Col>
            <Col xs={2}></Col>
            <Col xs={4} style={{ textAlign: "right", padding: "3% 0" }}>
              <img src={cup} />
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
              <h2>Create a Recipe</h2>
            </Col>
            <Col xs={2}></Col>
            <Col xs={4} style={{ textAlign: "right", padding: "3% 0" }}>
              <img src={earth} />
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
              <h2>Share it with the World</h2>
            </Col>
            <Col xs={2}></Col>
          </Row>
        </Col>
        <Col xs={12}>
          <div
            style={{
              backgroundImage: `url(${banner}`,
              height: "200px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          ></div>
        </Col>
      </Row>
    </Container>
  );
}
