'use strict';
import {
    getFiles,
    getFileNames
} from './file.controller.js';
import express from 'express'
export const filesRouter = express.Router();

filesRouter.get('/files/data', getFiles);
filesRouter.get('/files/list', getFileNames);


/* module.exports = api; */
