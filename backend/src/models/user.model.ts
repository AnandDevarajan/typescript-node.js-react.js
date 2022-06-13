import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import config from 'config'

export interface UserDocument extends mongoose.Document {
    email: string
    name: string
    password: string
    createdAt: Date
    updatedAt: Date
    comparePassword(enteredPassword: string): Promise<boolean>
}

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'))
        const hash = await bcrypt.hashSync(this.password, salt);
        this.password = hash
    }
    return next()
})

userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
    try {
        return bcrypt.compare(enteredPassword, this.password)
    }
    catch (error) {
        return false
    }
}

const User = mongoose.model("User", userSchema)

export default User