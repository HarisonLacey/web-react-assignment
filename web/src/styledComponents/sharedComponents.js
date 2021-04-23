import styled from "styled-components";

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
