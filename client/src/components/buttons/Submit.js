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
  - buttons
description: No description.
---
const Submit = ({ children, action }) => {
    return (
        <button type="button" className="text-white bg-gradient-to-br from-pink-500
         to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
          focus:ring-pink-200 rounded-lg
           text-sm px-5 py-3 text-center font-extrabold"
            onClick={action}
        >
            {children}
        </button>
    );
};
export default Submit;