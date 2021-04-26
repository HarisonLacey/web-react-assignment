import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/coffee-seed.png";
import menu from "../assets/menu.png";
import close from "../assets/close.png";

// header and menu component

// styled menu container
const MenuContainer = styled.div.attrs(({ height, menu }) => ({
  top: height ? "50px" : "110px",
  width: menu ? "40%" : "0",
  op: menu ? "100%" : "0",
  hide: menu ? "block" : "none",
}))`
  height: 100%;
  width: ${({ width }) => width};
  background-color: ${({ theme }) => theme.colors.secondary};
  position: fixed;
  top: ${({ top }) => top};
  opacity: ${({ op }) => op};
  transition: 0.5s width, 0.5s opacity;
  z-index: 3;
  text-decoration: none;
  a {
    color: ${({ theme }) => theme.colors.primary};
    padding: 0 0 20px 5px;
    font-size: 2em;
    display: ${({ hide }) => hide};
  }
  a:hover {
    background-color: ${({ theme }) => theme.colors.thirdly};
  }
`;

// styled header container
const HeaderContainer = styled.div.attrs(({ height }) => ({
  height: height ? "50px" : "110px",
  display: height ? "none" : "block",
  pad: height ? "5px" : "none",
}))`
  height: ${({ height }) => height};
  width: 100%;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.primary};
  overflow: hidden;
  top: 0;
  z-index: 2;
  h2 {
    font-family: "Lobster", cursive;
    font-size: 2.5em;
    color: ${({ theme }) => theme.colors.secondary};
    display: ${({ display }) => display};
  }
  img {
    padding-top: ${({ pad }) => pad};
  }
`;

// header component
export default function Header() {
  const [height, setHeight] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [menuIcon, setMenuIcon] = useState(menu);
  // menu items with url links
  const menuItems = [
    { path: "/", name: "Home" },
    { path: "/recipes", name: "Recipes" },
    { path: "/brewers", name: "Brewers" },
    { path: "/new/brewer", name: "New Brewer" },
    { path: "/new/recipe", name: "New Recipe" },
  ];
  // listener to adjust header height on scroll
  useEffect(() => {
    window.addEventListener("scroll", () => {
      document.documentElement.scrollTop > 70
        ? setHeight(true)
        : setHeight(false);
    });
  }, []);
  return (
    <>
      {/* header container */}
      <HeaderContainer height={height}>
        <Container fluid>
          <Row noGutters>
            <Col xs={1} md={3} lg={4}>
              <img
                alt="coffee bean logo"
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
      {/* menu container */}
      <MenuContainer height={height} menu={showMenu}>
        {/* map menu items */}
        {menuItems.map((e) => (
          <NavLink
            onClick={() => {
              setShowMenu(false);
              setMenuIcon(menu);
            }}
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
        ))}
      </MenuContainer>
    </>
  );
}
