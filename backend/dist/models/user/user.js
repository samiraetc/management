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
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectUsersByUsername = exports.selectUsersByEmail = exports.selectAllUsers = exports.selectUser = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.create({
        data: Object.assign({}, data),
        select: {
            id: true,
            first_name: true,
            last_name: true,
            full_name: true,
            email: true,
            created_at: true,
            username: true,
            position: true,
            language: true,
        },
    });
    return user;
});
exports.createUser = createUser;
const selectUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            full_name: true,
            email: true,
            created_at: true,
            username: true,
            position: true,
            language: true,
        },
    });
    return user;
});
exports.selectUser = selectUser;
const selectAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany({
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            full_name: true,
            created_at: true,
            username: true,
            position: true,
            language: true,
        },
    });
    return users;
});
exports.selectAllUsers = selectAllUsers;
const selectUsersByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: { email },
    });
    return user;
});
exports.selectUsersByEmail = selectUsersByEmail;
const selectUsersByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: { username },
    });
    return user;
});
exports.selectUsersByUsername = selectUsersByUsername;
