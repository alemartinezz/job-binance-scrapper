---
author: No author.
tags:
  - knowledge
  - comp-sci
  - projects
  - binance-scrapper-main
  - server
  - src
  - routes
description: No description.
---
import Router from 'express';
import manageWS from './ManageWS.js';

const appRouter = Router();

appRouter.use('/manage-ws',  manageWS);

export default appRouter;