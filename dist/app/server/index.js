"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var todos_1 = __importDefault(require("./routes/todos"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use(
  (0, cors_1.default)({
    origin: [
      "https://todo-app-dev-381607765507.asia-southeast2.run.app",
      "https://todo-app-381607765507.asia-southeast2.run.app",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  }),
);
app.options("*", (0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/todos", todos_1.default);
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  return console.log("\uD83D\uDE80 Express running on ".concat(PORT));
});
