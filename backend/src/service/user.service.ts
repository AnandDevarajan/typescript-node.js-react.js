import { DocumentDefinition } from 'mongoose'
import User, { UserDocument } from '../models/user.model';

export const createUser = async (input: DocumentDefinition<UserDocument>) => {
    try {
        return await User.create(input)
    } catch (e: any) {
        throw new Error(e)
    }
}