---
author: No author.
tags:
  - knowledge
  - comp-sci
  - projects
  - binance-scrapper-main
  - client
  - src
  - services
description: No description.
---
import { getData, putData } from "."

export const putBuy = async (currency, reference, accepted, paymentMethods) => {
    return await putData('/manage-ws', {
        currency,
        reference,
        accepted,
        paymentMethods,
        isBuy: true
    });
}

export const getStatusBuy = async (currency) => {
    return await getData(`/manage-ws?currency=${currency}&isBuy=true`);
}