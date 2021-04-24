import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// header and menu component

const MenuContainer = styled.div.attrs(({ height, menu }) => ({
  top: height ? "50px" : "100px",
  width: menu ? "40%" : "0",
  op: menu ? "100%" : "0",
  hide: menu ? "block" : "none",
}))`
  height: 100%;
  width: ${({ width }) => width};
  background-color: grey;
  position: fixed;
  top: ${({ top }) => top};
  transition: 0.5s;
  opacity: ${({ op }) => op};
  p {
    display: ${({ hide }) => hide};
  }
`;

const HeaderContainer = styled.div.attrs(({ height }) => ({
  height: height ? "50px" : "100px",
  op: height ? "70%" : "100%",
}))`
  height: ${({ height }) => height};
  width: 100%;
  position: fixed;
  opacity: ${({ op }) => op};
  background-color: whitesmoke;
  overflow: hidden;
  transition 0.5s;
  top: 0;
  z-index: 2;
`;

export default function Header() {
  const [height, setHeight] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuItems = [
    { path: "/", name: "home" },
    { path: "/recipes", name: "recipes" },
    { path: "/brewers", name: "brewers" },
    { path: "/new/recipe", name: "create recipe" },
    { path: "/new/brewer", name: "create brewer" },
  ];
  useEffect(() => {
    window.addEventListener("scroll", () => {
      document.documentElement.scrollTop > 50
        ? setHeight(true)
        : setHeight(false);
    });
  }, []);
  return (
    <>
      <HeaderContainer height={height}>
        <p onClick={() => (showMenu ? setShowMenu(false) : setShowMenu(true))}>
          Menu
        </p>
      </HeaderContainer>
      <MenuContainer height={height} menu={showMenu}>
        {menuItems.map((e) => (
          <p onClick={() => setShowMenu(false)}>
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
          </p>
        ))}
      </MenuContainer>
    </>
  );
}
