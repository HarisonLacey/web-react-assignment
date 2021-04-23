import styled from "styled-components";

// shared styled component sheet

// select component
export const Select = styled.select`
  :invalid {
    color: gray;
  }
  option {
    color: black;
  }
  option[disabled] {
    display: none;
  }
`;
