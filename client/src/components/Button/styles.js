import {css} from 'styled-components'

export const Button = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  cursor: pointer;

  ${({variant}) => variant === 'primary' && css`
    border-radius: 4px;
    border: none;
    background-color: #da77f2;
    color: #fff;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #ae3ec9;
    }
  `}

  ${({variant}) => variant === 'secondary' && css`
    border-radius: 4px;
    border: 1px solid #da77f2;
    background-color: #fff;
    color: #da77f2;

    transition: background-color, border 0.2s ease-in-out;  

    &:hover {
      background-color: #f8f0fc;
      border: 1px solid #cc5de8;
    }
  `}

`