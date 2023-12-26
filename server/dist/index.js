"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const path = require('path')
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const sequeilize = require('./db');
const fileupload = require('express-fileupload');
const models = require('./models/models');
const PORT = process.env.PORT || 5001;
const app = express();
app.use(fileupload({}));
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequeilize.authenticate();
        yield sequeilize.sync();
        app.listen(PORT, () => {
            console.log('Server is started 2sa', PORT);
        });
    }
    catch (e) {
        console.log(e);
    }
});
startServer();
