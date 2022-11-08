"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const passport_local_1 = require("passport-local");
const user_1 = __importDefault(require("./models/user"));
const users_1 = __importDefault(require("./routes/users"));
const categories_1 = __importDefault(require("./routes/categories"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
mongoose_1.default.connect('mongodb://localhost:27017/express-tsc');
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use((0, express_session_1.default)({
    secret: 'ts is challenging',
    resave: true,
    saveUninitialized: true
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.use(new passport_local_1.Strategy(user_1.default.authenticate()));
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser(user_1.default.deserializeUser());
app.use('/api/users', users_1.default);
app.use('/api/categories', categories_1.default);
app.listen(PORT, () => {
    console.log(`Server is on port ${PORT}`);
});
