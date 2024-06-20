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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.selectUserController = exports.createUserController = void 0;
const user_1 = require("@/models/user/user");
const userSchema_1 = require("@/schemas/user/userSchema");
const createUserController = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = userSchema_1.userSchema.parse(request.body);
        const body = {
            first_name: parsedBody.first_name,
            last_name: parsedBody.last_name,
            email: parsedBody.email,
            password: parsedBody.password,
            created_at: new Date(),
            username: parsedBody.username,
            position: parsedBody.position,
            language: parsedBody.language,
        };
        const user = yield (0, user_1.createUser)(body);
        const { password } = user, userWithoutPassword = __rest(user, ["password"]);
        reply.code(201).send({ data: userWithoutPassword });
    }
    catch (error) {
        reply.code(400).send(error);
    }
});
exports.createUserController = createUserController;
const selectUserController = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = request.params;
        const user = yield (0, user_1.selectUser)(userId);
        if (!user) {
            reply.code(404).send({ message: "User not found" });
            return;
        }
        reply.code(200).send({ data: user });
    }
    catch (error) {
        reply.code(400).send({ error });
    }
});
exports.selectUserController = selectUserController;
const getAllUsers = (_, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_1.selectAllUsers)();
        reply.code(200).send({ data: users });
    }
    catch (error) {
        reply.code(400).send({ error });
    }
});
exports.getAllUsers = getAllUsers;
