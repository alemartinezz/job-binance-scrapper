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
  - tables
description: No description.
---
const TableRow = ({ offers }) => {

    return (
        offers.map((o, i) =>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={i}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {o.offerer}
                </th>
                <td className="px-6 py-4">
                    {o.price}
                </td>
                <td className="px-6 py-4">
                    {o.paymentMethods.map((p, i) => <span className="px-3 py-2 text-white font-bold bg-gray-600 rounded-2xl mr-2" key={i}>{p + ' '}</span>)}
                </td>
                <td className="px-6 py-4">
                    {(Math.round(o.available * 100) / 100).toLocaleString("en-US")} {<span className="font-extrabold">{o.crypto}</span>}
                </td>
                <td className="px-6 py-4 text-right">
                    <a href={`https://p2p.binance.com/en/advertiserDetail?advertiserNo=${o.user_id}`} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Link</a>
                </td>
            </tr>
        )
    );
};


export default TableRow;