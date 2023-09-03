import React from "react";
import styled from "styled-components";

export function Menu({ items }) {
  console.log("menu", items);
  return (
    <ul>
      {items &&
        items.map((item) => {
          return <MenuItem key={item.id} item={item} />;
        })}
    </ul>
  );
}

function MenuItem({ item }) {
  console.log("menuitem", item);
  return (
    <li>
      {item.label}
      {item &&
        item.childrens.map((child) => {
          return <Menu key={child.id} items={child.childrens} />;
        })}
    </li>
  );
}
