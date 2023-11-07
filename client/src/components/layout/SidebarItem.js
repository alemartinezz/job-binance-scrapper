---
author: No author.
tags:
  - knowledge
  - comp-sci
  - projects
  - binance-scrapper-main
  - client
  - src
  - components
  - layout
description: No description.
---
import { NavLink } from "react-router-dom";

const SidebarItem = ({ input, link }) => {
    return (
        <NavLink to={link} className={({ isActive }) => `py-4 text-xl flex flex-grow px-8 hover:cursor-pointer hover:bg-white ${isActive ? 'bg-white' : ''}`} >
            {input}
        </NavLink>
    );
};


export default SidebarItem;