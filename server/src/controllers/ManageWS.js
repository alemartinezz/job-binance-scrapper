---
author: No author.
tags:
  - knowledge
  - comp-sci
  - projects
  - binance-scrapper-main
  - server
  - src
  - controllers
description: No description.
---
import WsArs from "../services/WsArs.js";
import WsEur from "../services/WsEur.js";
import WsUsd from "../services/WsUsd.js";
import WsUyu from "../services/WsUyu.js";

const currencyActions = {
    'UYU_BUY': (ws, paymentMethods, accepted, reference) => new WsUyu(ws, true, paymentMethods, accepted, reference),
    'USD_BUY': (ws, paymentMethods, accepted, reference) => new WsUsd(ws, true, paymentMethods, accepted, reference),
    'EUR_BUY': (ws, paymentMethods, accepted, reference) => new WsEur(ws, true, paymentMethods, accepted, reference),
    'ARS_BUY': (ws, paymentMethods, accepted, reference) => new WsArs(ws, true, paymentMethods, accepted, reference),
    'UYU_SELL': (ws, paymentMethods, accepted, reference) => new WsUyu(ws, false, paymentMethods, accepted, reference),
    'USD_SELL': (ws, paymentMethods, accepted, reference) => new WsUsd(ws, false, paymentMethods, accepted, reference),
    'EUR_SELL': (ws, paymentMethods, accepted, reference) => new WsEur(ws, false, paymentMethods, accepted, reference),
    'ARS_SELL': (ws, paymentMethods, accepted, reference) => new WsArs(ws, false, paymentMethods, accepted, reference)
}

const WSObjects = {};

export const toggleONOF = (req, res) => {

    let {
        currency,
        isBuy,
        paymentMethods,
        accepted,
        reference
    } = req.body;

    if (!currency) {
        return res.status(400).end();
    }

    try {
        accepted = parseFloat(accepted);
        reference = parseFloat(reference);
    } catch (error) {
        return res.status(400);
    }

    const index = currency + '_' + (isBuy ? 'BUY' : 'SELL');
    if (Object.keys(WSObjects).includes(index)) {
        // TURN OFF
        WSObjects[index].schedule.stop();
        delete WSObjects[index];
    } else {
        // TURN ON
        const wsToToggle = currencyActions[index](global.IO, paymentMethods, accepted, reference);
        wsToToggle.schedule.start();
        WSObjects[index] = wsToToggle;
    }
    res.status(200).end();
}

export const getStatus = (req, res) => {
    const {
        currency,
        isBuy
    } = req.query;

    if (!currency) {
        return res.status(400).end();
    }

    const index = currency + '_' + (isBuy === 'true' ? 'BUY' : 'SELL');
    const wsObject = WSObjects[index];

    res.status(200).json({
        status: wsObject ? true : false,
        isBuy: wsObject ? wsObject.isBuy : null,
        reference: wsObject ? wsObject.reference : 0,
        accepted: wsObject ? wsObject.accepted : 0,
        paymentMethods: wsObject ? wsObject.paymentMethods : []
    })
}