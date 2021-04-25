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
    font-family: 'Fredoka One', cursive;
    color: #314e52;
    border: none;
  }
  button {
    height: 50px;
  }
`;

// select component
export const Select = styled.select.attrs(({ inline }) => ({
  display: inline ? "inline-block" : "block",
  width: inline ? "30%" : "90%",
  margin: inline ? "2%" : "2% 0",
}))`
  width: ${({ width }) => width};
  margin: ${({ margin }) => margin};
  font-family: 'Fredoka One', cursive; 
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

export const Button = styled.button`
border: none;
background-color: #ffefa0;
font-family: 'Fredoka One', cursive; 
border-radius: 5px;
color: #314e52;
:hover {
  background-color: #314e52;
  color: whitesmoke;
}
`
export const ItemDisplay = styled.div`
width: 90%;
font-family: 'Monoton', cursive;
margin: 0 auto;
height: 300px;
display: flex;
align-items: center;
background-color: #314e52;
color: #ffefa0;
h2 {
margin: 0 auto;
}
`
