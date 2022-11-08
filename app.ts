import dotenv from 'dotenv';
dotenv.config();
import express, {Express, Request, Response} from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/user';
import userRoutes from './routes/users';
import categoryRoutes from './routes/categories';


const app: Express = express();
const PORT = process.env.PORT || 8000;

mongoose.connect('mongodb://localhost:27017/express-tsc');


app.use(express.json());
app.use(morgan('dev'));
app.use(session({
    secret: 'ts is challenging',
    resave: true,
    saveUninitialized: true
}));

type User = {
    _id?: number
}

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser((user: User, done) => {
    done(null, user._id);
});
passport.deserializeUser(User.deserializeUser());

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);

app.listen(PORT, () => {
    console.log(`Server is on port ${PORT}`);
});