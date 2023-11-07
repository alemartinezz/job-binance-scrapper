---
author: No author.
tags:
  - knowledge
  - comp-sci
  - projects
  - binance-scrapper-main
  - server
description: No description.
---
import cors from 'cors';
import dotenv from 'dotenv';
import express, { json, urlencoded } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import appRouter from './src/routes/Index.js';
import saveUSDQuote from './src/services/storeUSDQuote.js';

dotenv.config();

const api = express();
const IOserver = http.createServer();
const IO = new Server(IOserver, { cors: { origin: '*' } });
global.IO = IO;

api.set('port', process.env.PORT || 4000);
api.set('host', '192.168.1.137' || '127.0.0.1');

api.use(cors({
    origin: '*',
    exposedHeaders: ['content-type', 'content-disposition', 'x-forwarded-for']
}));

api.use(json({ limit: '1mb', extended: true }));
api.use(urlencoded({
    extended: true,
    limit: '1mb'
}));

api.use(appRouter);

saveUSDQuote();

api.listen(api.get('port'), () => {
    console.log(`Server on http://${api.get('host') + ':' + api.get('port')}`);
});

IOserver.listen(process.env.WSS_PORT || 4004, '192.168.1.137' || '127.0.0.1', () => {
    console.log(`Websocket on http://${'192.168.1.137' || '127.0.0.1'}:${process.env.WSS_PORT || 4004}`);
});