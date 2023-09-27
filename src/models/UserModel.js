import { Schema, model } from 'mongoose';
const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, required: true, default: true },
        phone: { type: Number, required: true },
        access_token: { type: String, required: true },
        refresh_token: { type: String, required: true },
    },
    {
        timestamps: true
    }
)
const User = model("User", userSchema);
export default User;