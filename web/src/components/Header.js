import React, { useState, useEffect } from "react";
import styled from "styled-components";

// header component

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
`;

export default function Header() {
  const [height, setHeight] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      document.documentElement.scrollTop > 50
        ? setHeight(true)
        : setHeight(false);
    });
  }, []);
  return <HeaderContainer height={height}>Header</HeaderContainer>;
}
