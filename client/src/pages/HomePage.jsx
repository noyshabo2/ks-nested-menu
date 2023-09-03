import { Menu } from "../components/Menu/Menu";
import styled from "styled-components";
const myItems = [
  {
    id: 1,
    label: "Home",
    childrens: [{ id: 2, label: "Home 1", childrens: [] }],
  },
  {
    id: 3,
    label: "About",
    childrens: [
      { id: 4, label: "About 1", childrens: [] },
      { id: 5, label: "About 2", childrens: [] },
    ],
  },
];

const Wrapper = styled.aside`
  width: 300px;
  background: #ccc;
  padding: 20px;
`;

export const HomePage = () => {
  return (
    <div>
      <Wrapper>
        <Menu items={myItems} />
      </Wrapper>
    </div>
  );
};

export default HomePage;
