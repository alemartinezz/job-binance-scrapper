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
import { useEffect, useState } from "react";
import io from 'socket.io-client';
import TableRow from "./TableRow";


const BuyTable = ({ currency }) => {

    // socket state
    const [socket, setSocket] = useState();
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        const newSocket = io(`${process.env.REACT_APP_API_WS_PROTOCOL || 'http'}://${window.location.hostname}:${process.env.REACT_APP_API_WS_PORT}`);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    useEffect(() => {
        const updateListener = ({ data }) => {
            setOffers(_ => data);
        };

        if (socket) {
            socket.on(`UPDATE@${currency}@BUY`, updateListener);
        }

        return () => {
            if (socket) {
                socket.off(`UPDATE@${currency}@BUY`, updateListener);
            }
        };
    }, [socket, currency]);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Usuario
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Precio
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Pagos
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Disponible
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Link
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <TableRow offers={offers} />
                </tbody>
            </table>
        </div>
    );
};
export default BuyTable;