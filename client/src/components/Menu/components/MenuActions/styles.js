import {css} from 'styled-components'

export const ActionsList = css`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;

  > li {
    cursor: pointer;
    padding: 5px 10px;

    &:not(:last-child) {
      border-bottom: 1px solid #eebefa;
    }

    &:hover {
      background-color: #f8f0fc;
    }
  }
`

export const MenuEdit = css`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  > .buttons-container {
    display: flex;
    gap: 10px;
  }
`