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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
// import authuser from '../middleware/authuser';
require('dotenv').config({ path: '../.env' });
const router = express_1.default.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const prisma = new client_1.PrismaClient();
router.post('/createuser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let success = false;
    const { name, email, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({
            where: {
                email: email,
            }
        });
        if (user) {
            return res.status(403).send('User with the given email already exists');
        }
        else {
            const createdUser = yield prisma.user.create({
                data: {
                    name,
                    email,
                    password
                }
            });
            const userId = createdUser.id;
            const data = { user: { id: userId } };
            const token = jsonwebtoken_1.default.sign(data, JWT_SECRET);
            if (token)
                success = true;
            return res.json({ success, token });
        }
    }
    catch (error) {
        console.log('Internal server error');
        console.error('Internal server error :: ' + error);
        res.status(500).send('Some error occurred');
    }
    finally {
        yield prisma.$disconnect();
    }
}));
module.exports = router;
