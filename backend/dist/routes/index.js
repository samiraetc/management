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
const auth_1 = __importDefault(require("./auth"));
const estimatives_1 = __importDefault(require("./estimatives"));
const labels_1 = __importDefault(require("./labels"));
const priorities_1 = __importDefault(require("./priorities"));
const team_labels_1 = __importDefault(require("./team-labels"));
const team_1 = __importDefault(require("./team"));
const user_1 = __importDefault(require("./user"));
const workspace_labels_1 = __importDefault(require("./workspace-labels"));
const workspace_members_1 = __importDefault(require("./workspace-members"));
const workspace_1 = __importDefault(require("./workspace"));
const team_members_1 = __importDefault(require("./team-members"));
const routes = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.register(estimatives_1.default);
    app.register(labels_1.default);
    app.register(auth_1.default);
    app.register(priorities_1.default);
    app.register(user_1.default);
    app.register(workspace_1.default);
    app.register(workspace_labels_1.default);
    app.register(workspace_members_1.default);
    app.register(team_1.default);
    app.register(team_labels_1.default);
    app.register(team_members_1.default);
});
exports.default = routes;
