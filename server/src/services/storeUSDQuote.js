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
import { load } from "cheerio";
import { schedule } from "node-cron";

const saveUSDQuote = async () => {

    const getData = async () => {
        let uri, response, $, buySell, buy, sell;

        try {
            // UYU -> USD
            uri = 'https://www.bcu.gub.uy/Paginas/Default.aspx';
            response = await axios.get(uri);
            $ = load(response.data);

            buySell = $('span').filter(function () { return $(this).text().trim() === 'US$ Billete' }).next().text().replace(',', '.');
            buySell = parseFloat(buySell);

            if (!buySell) {
                console.log('No se pudo cargar la cotizacion del dolar en UYU');
            } else {
                global.USD = buySell;
            }

            // EUR -> USD
            buySell = $('span').filter(function () { return $(this).text().trim() === 'Euro' }).next().text().replace(',', '.');
            buySell = parseFloat(buySell);

            if (!buySell) {
                console.log('No se pudo cargar la cotizacion del dolar en EUR');
            } else {
                global.EUR = buySell / global.USD;
            }

            // ARG (Blue) -> USD
            uri = 'https://www.lanacion.com.ar/dolar-hoy/';
            response = await axios.get(uri);
            $ = load(response.data);
            buySell = $('h2').filter(function () { return $(this).text().trim() === 'Dólar blue' }).parent().next().children('strong');

            if (!buySell) {
                console.log('No se pudo cargar la cotizacion del dolar en ARG');
            } else {
                buy = buySell.first().text().replace(',', '.').replace('$', '');
                sell = buySell.last().text().replace(',', '.').replace('$', '');
                global.ARS = (buy + sell) / 2;
            }

            console.log("Quotes loaded!!");

        } catch (error) {
            console.log('No se pudo cargar la cotizacion del dolar ' + error);
        }
    }    

    await getData();

    schedule('0 6 * * 1-6', getData, {
        timezone: "America/Montevideo"
    });

}

export default saveUSDQuote;