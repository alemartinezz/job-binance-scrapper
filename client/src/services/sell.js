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

export const putSell = async (currency, reference, accepted, paymentMethods) => {
    return await putData('/manage-ws', {
        currency,
        reference,
        accepted,
        paymentMethods,
        isBuy: false
    });
}

export const getStatusSell = async (currency) => {
    return await getData(`/manage-ws?currency=${currency}&isBuy=false`);
}