import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/coffee-seed.png";
import menu from "../assets/menu.png";
import close from "../assets/close.png";

// header and menu component

const MenuContainer = styled.div.attrs(({ height, menu }) => ({
  top: height ? "50px" : "110px",
  width: menu ? "40%" : "0",
  op: menu ? "90%" : "0",
  hide: menu ? "block" : "none",
}))`
  height: 100%;
  width: ${({ width }) => width};
  background-color: #ffefa0;
  position: fixed;
  top: ${({ top }) => top};
  opacity: ${({ op }) => op};
  transition: 0.5s width, 0.5s opacity;
  z-index: 3;
  font-family: "Fredoka One", cursive;
  text-decoration: none;
  h3 {
    display: ${({ hide }) => hide};
    padding: 0 0 10px 5px;
  }
  a {
    color: #314e52;
  }
  a:hover {
    text-decoration: none;
    color: whitesmoke;
  }
`;

const HeaderContainer = styled.div.attrs(({ height }) => ({
  height: height ? "50px" : "110px",
  display: height ? "none" : "block",
  pad: height ? "5px" : "none",
}))`
  height: ${({ height }) => height};
  width: 100%;
  position: fixed;
  background-color: #314e52;
  overflow: hidden;
  top: 0;
  z-index: 2;
  h2 {
    font-family: "Lobster", cursive;
    font-size: 2.5em;
    color: #ffefa0;
    display: ${({ display }) => display};
  }
  img {
    padding-top: ${({ pad }) => pad};
  }
`;

export default function Header() {
  const [height, setHeight] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [menuIcon, setMenuIcon] = useState(menu);
  const menuItems = [
    { path: "/", name: "Home" },
    { path: "/recipes", name: "Recipes" },
    { path: "/brewers", name: "Brewers" },
    { path: "/new/brewer", name: "New Brewer" },
    { path: "/new/recipe", name: "New Recipe" },
  ];
  useEffect(() => {
    window.addEventListener("scroll", () => {
      document.documentElement.scrollTop > 100
        ? setHeight(true)
        : setHeight(false);
    });
  }, []);
  return (
    <>
      <HeaderContainer height={height}>
        <Container fluid>
          <Row noGutters>
            <Col xs={1} md={3} lg={4}>
              <img
                src={menuIcon}
                style={{ paddingTop: "8px", cursor: "pointer" }}
                onClick={() => {
                  showMenu ? setShowMenu(false) : setShowMenu(true);
                  showMenu ? setMenuIcon(menu) : setMenuIcon(close);
                }}
              />
            </Col>
            <Col
              xs={10}
              md={6}
              lg={4}
              style={{ textAlign: "center", paddingTop: "5px" }}
            >
              <h2>Brewers Union</h2>
              <img src={logo} />
            </Col>
            <Col xs={1} md={3} lg={4}></Col>
          </Row>
        </Container>
      </HeaderContainer>
      <MenuContainer height={height} menu={showMenu}>
        {menuItems.map((e) => (
          <h3
            onClick={() => {
              setShowMenu(false);
              setMenuIcon(menu);
            }}
          >
            <NavLink
              to={e.path}
              exact
              activeStyle={{ display: "none" }}
              isActive={(match) => {
                if (!match) return false;
                return true;
              }}
            >
              {e.name}
            </NavLink>
          </h3>
        ))}
      </MenuContainer>
    </>
  );
}
