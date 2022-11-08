import mongoose, { Schema, PassportLocalSchema, PassportLocalDocument, PassportLocalModel } from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';


const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    employerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

const User: PassportLocalModel<PassportLocalDocument> = mongoose.model('User', userSchema);

export default User;