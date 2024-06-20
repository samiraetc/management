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
const userController_1 = require("@/controllers/user/userController");
const userRoutes = (server) => __awaiter(void 0, void 0, void 0, function* () {
    server.post('/users', userController_1.createUserController);
    server.get("/users/:userId", { preValidation: [server.authenticate] }, userController_1.selectUserController);
    server.get("/users", { preValidation: [server.authenticate] }, userController_1.getAllUsers);
});
exports.default = userRoutes;
