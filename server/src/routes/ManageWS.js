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
import { getStatus, toggleONOF } from '../controllers/ManageWS.js';

const manageWS = Router();

manageWS.get('/', getStatus);
manageWS.put('/', toggleONOF);

export default manageWS;