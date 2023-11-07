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
import Binance from 'binance-api-node';
import { CRYPTOS } from '../utils/Constants.js';

const saveMarketData = async () => {

    const client = Binance.default();

    global.CryptoValues = {};

    for (const crypto of CRYPTOS) {
        global.CryptoValues[crypto] = 0;
    }

    global.CryptoValues['USDT'] = 1;

    const pairs = Object.keys(global.CryptoValues).filter(e => e !== 'USDT').map(e => `${e}USDT`);
    for (const symbol of pairs) {
        try {
            const r = await client.prices({ symbol });
            const s = symbol.replace('USDT', '');
            const price = parseFloat(r[symbol]);
            global.CryptoValues[s] = price;
        } catch (error) { 
            console.log('Can not load ', symbol, error);
        }
    }

}

export default saveMarketData;