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

export default function WsArs(ws, isBuy, paymentMethods, accepted, reference) {
    
    const _schedule = schedule('* * * * *', async () => {
        let data = await getData(isBuy, 'ARS');
        data = await filterOffers(data, isBuy, reference, accepted, paymentMethods, global.ARS);
        ws.emit(`UPDATE@ARS@${isBuy ? 'BUY' : 'SELL'}`, { data });
        console.log(`UPDATE@ARS@${isBuy ? 'BUY' : 'SELL'}`);
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