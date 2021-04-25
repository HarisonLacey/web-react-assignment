import styled from "styled-components";

// shared styled component sheet

// form component
export const Form = styled.form`
  input,
  button,
  textarea {
    display: block;
    width: 90%;
    margin: 2% auto;
    font-family: "Fredoka One", cursive;
    color: #314e52;
    border: none;
    font-size: 1.5em;
  }
  button {
    height: 50px;
  }
`;

// select component
export const Select = styled.select.attrs(({ inline, size }) => ({
  display: inline ? "inline-block" : "block",
  width: inline ? "30%" : "90%",
  margin: inline ? "1%" : "2% auto",
  font: size || "1.5em",
}))`
  width: ${({ width }) => width};
  margin: ${({ margin }) => margin};
  font-family: "Fredoka One", cursive;
  font-size: ${({ font }) => font};
  color: #314e52;
  border: none;
  display: ${({ display }) => display};
  :invalid {
    color: gray;
  }
  option {
    color: #314e52;
  }
  option[disabled] {
    display: none;
  }
`;

// button component
export const Button = styled.button.attrs(({ height }) => ({
  height: height || "1.5em",
}))`
  border: none;
  height: ${({ height }) => height};
  background-color: #ffefa0;
  font-family: "Fredoka One", cursive;
  border-radius: 5px;
  color: #314e52;
  :hover {
    background-color: #314e52;
    color: whitesmoke;
  }
  a {
    color: #314e52;
  }
  a:hover {
    color: whitesmoke;
  }
`;

// item display thumbnails
export const ItemDisplay = styled.div`
  width: 90%;
  font-family: "Monoton", cursive;
  margin: 0 auto;
  height: 300px;
  display: flex;
  align-items: center;
  background-color: #314e52;
  color: #ffefa0;
  :hover {
    box-shadow: 5px 10px black;
  }
  h2 {
    text-align: center;
    margin: 0 auto;
  }
`;
