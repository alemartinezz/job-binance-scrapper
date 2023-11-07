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
import { FaPercentage } from "react-icons/fa";

const InputNumber = ({ id, title, step, setInputValue, defaultValue }) => {
    return (
        <div className="block space-y-2">
            <label className="text-gray-800 font-bold" htmlFor={id}>{title}</label>
            <div className="flex px-2 rounded-md text-gray-600 border border-gray-300 bg-white">
                <FaPercentage size={15} fill='#52514c' className="place-self-center" />
                <input
                    type="number"
                    id={id}
                    className="w-full h-9 py-2 ml-2 outline-0 font-medium"
                    step={step}
                    onChange={e => setInputValue(e.target.value)}
                    defaultValue={defaultValue}
                />
            </div>
        </div>
    );
};
export default InputNumber;