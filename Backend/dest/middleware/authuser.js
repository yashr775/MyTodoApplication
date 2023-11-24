"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: '../../.env' });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const authuser = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        res.status(404).send("Invalid token");
    }
    try {
        if (JWT_SECRET === undefined) {
            console.error("JWT_SECRET is not defined");
            return res.status(500).send("Internal Server Error");
        }
        const data = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (typeof data === 'string' || !data.user) {
            console.error('Invalid token');
            return res.status(401).send({ error: 'Invalid token' });
        }
        req.user = data.user;
        next();
    }
    catch (error) {
        console.error("Internal server error :: " + error);
        return res.status(401).send({ error: "Some error occured" });
    }
};
exports.default = authuser;
