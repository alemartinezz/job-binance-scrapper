---
author: No author.
tags:
  - knowledge
  - comp-sci
  - projects
  - binance-scrapper-main
  - client
  - src
  - utils
description: No description.
---
export const PAGOS = [
    { label: "WISE", value: "Wise" },
    { label: "BOFA", value: "BankofAmerica" },
    { label: "Depósito en efectivo", value: "CashDeposit" },
    { label: "Mercado Pago", value: "MercadoPagoNew" },
    { label: "Oca Blue", value: "OcaBlue" },
    { label: "Fucerep", value: "BancoFucerep" },
    { label: "Bandes UY", value: "BandesUruguay" },
    { label: "Santander UY", value: "SantanderUrug" },
    { label: "Itaú UY", value: "ItauUruguay" },
    { label: "BROU", value: "BankRepublicUruguay" },
    { label: "Pago en persona", value: "CashInPerson" }
];

export const MONEDAS = [
    { label: "Pesos UY 🇺🇾", value: "UYU", pagos: [PAGOS[2], PAGOS[3], PAGOS[4], PAGOS[5], PAGOS[6], PAGOS[7], PAGOS[8], PAGOS[9], PAGOS[10]] },
    { label: "Dólares 🇺🇸", value: "USD", pagos: PAGOS },
    { label: "Euros 🇪🇺", value: "EUR", pagos: [PAGOS[0], PAGOS[1], PAGOS[2], PAGOS[10]] },
    { label: "Pesos ARG 🇦🇷", value: "ARS", pagos: [PAGOS[0], PAGOS[2], PAGOS[3], PAGOS[7], PAGOS[9], PAGOS[10]] }
];