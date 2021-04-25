import { createGlobalStyle } from "styled-components";

// global style sheet

// global styles
export const GlobalStyle = createGlobalStyle`
body {
  background-color: #314e52;
  font-family: "Monoton", cursive; 
}
a:hover {
  text-decoration: none;
}
`;

// styled themes
export const themes = {
  colors: {
    primary: "#314e52",
    secondary: "#ffefa0",
    thirdly: "whitesmoke",
  },
};
