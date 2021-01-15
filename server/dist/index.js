"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv = __importStar(require("dotenv"));
var path_1 = __importDefault(require("path"));
dotenv.config({ path: path_1.default.resolve(__dirname, "../.env") });
var mongoose_1 = __importDefault(require("mongoose"));
var session = require("express-session");
var passport_1 = __importDefault(require("./config/passport"));
var cors_1 = __importDefault(require("cors"));
passport_1.default;
// Routes variables
var apiRouter = require("./routes/api");
var app = express_1.default();
// MongoDB
mongoose_1.default.connect(process.env.MONGO_DB || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
var db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors_1.default());
// routes
app.use("/api", apiRouter);
app.listen(process.env.PORT || 8080);
