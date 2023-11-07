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

export default function WsUyu(ws, isBuy, paymentMethods, accepted, reference) {

    const _schedule = schedule('* * * * *', async () => {
        let data = await getData(isBuy, 'UYU');
        data = await filterOffers(data, isBuy, reference, accepted, paymentMethods, global.USD);
        ws.emit(`UPDATE@UYU@${isBuy ? 'BUY' : 'SELL'}`, { data });
        console.log(`UPDATE@UYU@${isBuy ? 'BUY' : 'SELL'}`);
    },
        {
            timezone: 'America/Montevideo',
            scheduled: false
        }
    );

    return {
        schedule: _schedule,
        isBuy,
        paymentMethods,
        accepted,
        reference
    }
}