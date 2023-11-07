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
import SidebarItem from "./SidebarItem";
const Sidebar = () => {
    return (
        <aside className="items-stretch border-r-2 border-r-slate-700 w-1/5 py-8">
            <h1 className="flex items-center justify-center text-2xl font-bold text-center mb-16">
                <img className="bg-cover h-10 mr-4" src="https://seeklogo.com/images/B/binance-coin-bnb-logo-CD94CC6D31-seeklogo.com.png" /> Binance Scrapper
            </h1>
            <SidebarItem input="Compra" link="/compra" className="border-b-2 border-b-slate-600"/>
            <hr className="h-[2px] bg-gray-600" />
            <SidebarItem input="Venta"  link="/venta"/>
        </aside>
    );
};


export default Sidebar;