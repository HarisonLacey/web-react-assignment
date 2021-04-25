import React from "react";
import Header from "./Header";
import { Container, Row, Col } from "react-bootstrap";
import facebook from "../assets/facebook.png";

export default function Layout({ children }) {
  return (
    <>
      <header>
        <Header />
      </header>
      <main style={{ paddingTop: "100px" }}>{children}</main>
      <footer style={{ height: "100px", backgroundColor: "#314e52" }}>
        <Container fluid>
          <Row noGutters>
            <Col xs={4}></Col>
            <Col
              xs={4}
              style={{
                display: "flex",
                alignItems: "center",
                paddingTop: "5px",
                height: "100px"
              }}
            >
              <img style={{ margin: "0 auto" }} src={facebook} />
            </Col>
            <Col xs={4}></Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}
