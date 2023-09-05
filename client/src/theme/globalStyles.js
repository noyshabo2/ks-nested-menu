import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    line-height: 1.4;
    padding: 20px;
  }
`

export default GlobalStyle;