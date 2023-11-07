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
const CheckBox = (id) => {
    return (
        <label htmlFor={id} className="flex items-end">
            <input type="checkbox" id={id} className="h-8 w-8 rounded-lg" />
        </label>
    );
};
export default CheckBox;