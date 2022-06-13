import { Request, Response } from 'express'
import { createUserInput } from '../schema/user.schema'
import { createUser } from '../service/user.service'
import log from '../utils/logger'

export const createUserHandler = async (req: Request<{}, {}, createUserInput['body']>, res: Response) => {
    try {
        const user = await createUser(req.body)
        return user
    } catch (e: any) {
        log.error(e)
        return res.status(409).send(e.message)
    }
}