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
exports.loginController = void 0;
const user_1 = require("@/models/user/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema_1 = require("@/schemas/user/userSchema");
const loginController = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = userSchema_1.loginSchema.parse(request.body);
        const user = yield (0, user_1.selectUsersByEmail)(parsedBody.email);
        if (!user) {
            return reply.code(401).send({ message: "Invalid email or password" });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(parsedBody.password, user.password);
        if (!isPasswordValid) {
            return reply.code(401).send({ message: "Invalid email or password" });
        }
        const token = request.server.jwt.sign({ email: user.email });
        reply.code(200).send({ token });
    }
    catch (error) {
        reply.code(400).send({ error: "Login failed", details: error });
    }
});
exports.loginController = loginController;
