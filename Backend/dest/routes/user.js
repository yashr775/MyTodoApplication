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
const zod_1 = require("zod");
const zod_validation_error_1 = require("zod-validation-error");
const client_1 = require("@prisma/client");
const authuser_1 = __importDefault(require("../middleware/authuser"));
require('dotenv').config({ path: '../.env' });
const router = express_1.default.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const prisma = new client_1.PrismaClient();
const createUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "minimum 3 characters required"),
    email: zod_1.z.string().email("wrong email format"),
    password: zod_1.z.string(),
});
const loginUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
router.post('/createuser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let success = false;
    const { name, email, password } = req.body;
    const userData = { name, email, password };
    const validationResult = createUserSchema.safeParse(userData);
    if (!validationResult.success) {
        res.status(403).send((0, zod_validation_error_1.fromZodError)(validationResult.error));
    }
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
                data: { name,
                    email,
                    password
                }
            });
            const userId = createdUser.id;
            const data = { user: { _id: userId } };
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
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let success = false;
    const { email, password } = req.body;
    const loginData = { email, password };
    const validationResult = loginUserSchema.parse(loginData);
    try {
        const user = yield prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            res.status(403).send("User with the given email does not exist");
        }
        if (password !== (user === null || user === void 0 ? void 0 : user.password)) {
            return res.status(403).send("wrong password entered");
        }
        const userId = user === null || user === void 0 ? void 0 : user.id;
        const data = { user: { _id: userId } };
        let token = '';
        if (typeof JWT_SECRET === "string") {
            token = jsonwebtoken_1.default.sign(data, JWT_SECRET);
            success = true;
        }
        return res.status(200).json({ success, token });
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
router.get("/getuser", authuser_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.user._id);
        const userId = req.user._id;
        const user = yield prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(400).send("User with the given id does not exist");
        }
        return res.status(200).send(user);
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
router.delete("/deleteuser", authuser_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.user._id);
        const userId = req.user._id;
        const user = yield prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(400).send("User with the given id does not exist");
        }
        const deletedUser = yield prisma.user.delete({ where: { id: userId } });
        res.status(200).json(deletedUser);
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
