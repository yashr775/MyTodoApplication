"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
var cors = require('cors');
const port = 5000;
app.use(cors());
app.use(express_1.default.json());
app.use('/api/user', require('./routes/user'));
// app.use('/api/todo', require('./routes/todo'));
app.listen(port, () => {
    console.log(`App is listening on ${port}`);
});
