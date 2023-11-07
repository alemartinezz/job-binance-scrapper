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
  - form
description: No description.
---
import { MultiSelect } from "react-multi-select-component";

const MultiSelectt = ({ title, list, selected, setSelected }) => {
    return (
        <div className="flex flex-col space-y-2">
            <label className="font-bold text-md">{title}</label>
            <MultiSelect
                options={list}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
            />
        </div>
    );
};

export default MultiSelectt;