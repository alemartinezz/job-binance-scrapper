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
import saveMarketData from "./storeCryptoQuotes.js";

export const filterOffers = async (data, isBuy, reference, accepted, paymentMethods, quotation = 1) => {
    await saveMarketData();
    const resign_percentage = (accepted * reference) / 100;
    const point_percentage = (reference - resign_percentage) / 100;
    if (isBuy) {
        data = data.filter(d => {
            const ref_value = quotation - (quotation * point_percentage);
            const price_comparison = ref_value * global.CryptoValues[d.crypto];
            if (!price_comparison || price_comparison === 0) {
                return false;
            }
            const payments = paymentMethods.some(payment => d.paymentMethods.includes(payment));
            const amount_available = (d.available * quotation) >= (quotation * 300);
            return d.price <= price_comparison && payments && amount_available;
        });
    } else {
        data = data.filter(d => {
            const ref_value = quotation + (quotation * point_percentage);
            const price_comparison = ref_value * global.CryptoValues[d.crypto];
            if (!price_comparison || price_comparison === 0) {
                return false;
            };
            const payments = paymentMethods.some(payment => d.paymentMethods.includes(payment));
            const amount_available = (d.available * quotation) >= (quotation * 300);
            return d.price >= price_comparison && payments && amount_available;
        });
    }
    data.sort((a, b) => b.price - a.price);
    return data;
}