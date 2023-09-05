import styled, {css} from 'styled-components'

export const MenuItem = css`
  display: flex;
  flex-direction: column;
  width: 200px;
  gap: 5px;


  > .label-container {
    background-color: #e599f7;
    color: #ffffff;
    padding: 5px;
    width: 200px;
    border: 1px solid #da77f2;
    display: flex;
    justify-content: space-between;

    &:hover {
      background-color: #ae3ec9;
    }
  }
`

export const Menu = css`
  display: flex;
  flex-direction: column;
  gap: 5px;

  margin-left: 10px;
`

export const Arrow = css`
  display: flex;
  height: 25px;
  width: 35px;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &::after {
    content: "";
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;

    border-top: 4px solid #000;

    transform: ${({isExpanded}) => isExpanded ? "rotate(180deg)" : "rotate(0deg)"};
  }
`;