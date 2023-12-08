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
const fs = require('fs');
const PORT = process.env.PORT || 5001;
const app = express();
app.use(cors());
app.use(express.json());
app.post('/api/folders', (req, res) => {
    const items = fs.readdirSync('.', { withFileTypes: true });
    const folders = items.filter((item) => item.isDirectory).map((item) => item.name);
    res.status(200).json(folders);
    // });
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app.listen(PORT, () => {
            console.log('Server is started', PORT);
        });
    }
    catch (e) {
        console.log(e);
    }
});
startServer();
