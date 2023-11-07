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
import axios from "axios";
import { PAGOS } from "../utils/Constants.js";

function Offer(rawData) {
    return {
        offerer: rawData.advertiser.nickName,
        type: rawData.adv.tradeType,
        crypto: rawData.adv.asset,
        currency: rawData.adv.fiatUnit,
        price: rawData.adv.price,
        user_id: rawData.advertiser.userNo,
        paymentMethods: rawData.adv.tradeMethods.map(m => m.payType),
        available: rawData.adv.tradableQuantity
    }
}

const getData = async (isBuy, currency) => {

    try {
        let offers = [];
        let cryptos = ["USDT", "BTC", "BUSD", "BNB", "ETH", "DAI"];

        const uri = `https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search`;

        for (const crypto of cryptos) {
            let postBody = {
                "asset": crypto.toUpperCase(),
                "countries": [],
                "fiat": currency,
                "page": 1,
                "payTypes": PAGOS.map(p => p.value),
                "publisherType": null,
                "rows": 20,
                "tradeType": isBuy ? "BUY" : "SELL",
            };

            const r = await axios.post(uri, postBody, {
                headers: {
                    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                    "sec-ch-ua-platform": "Linux",
                    "sec-ch-ua": 'Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102',
                    "origin": "https://p2p.binance.com",
                    "content-type": "application/json"
                }
            }).catch(e => console.log(e));
            offers = [...offers, ...Object.values(r.data.data).map(value => new Offer(value))]
        }

        return offers;

    } catch (error) {
        console.log('No se pudo cargar la cotizacion del dolar ' + error);
    }
};

export default getData;