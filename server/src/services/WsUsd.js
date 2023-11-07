---
author: No author.
tags:
  - knowledge
  - comp-sci
  - projects
  - binance-scrapper-main
  - server
  - src
  - services
description: No description.
---
import { schedule } from "node-cron";
import getData from "./scrapper.js";
import { filterOffers } from "./utils.js";

export default function WsUsd(ws, isBuy, paymentMethods, accepted, reference) {

    // * * * * * *
    // [S] M H D S M
    const _schedule = schedule('* * * * *', async () => {
        let data = await getData(isBuy, 'USD');
        data = await filterOffers(data, isBuy, reference, accepted, paymentMethods);
        ws.emit(`UPDATE@USD@${isBuy ? 'BUY' : 'SELL'}`, { data });
        console.log(`UPDATE@USD@${isBuy ? 'BUY' : 'SELL'}`);
    },
        {
            timezone: 'America/Montevideo',
            scheduled: false
        }
    )

    return {
        schedule: _schedule,
        isBuy,
        paymentMethods,
        accepted,
        reference
    }
}