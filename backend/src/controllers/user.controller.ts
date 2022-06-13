import { Request, Response } from 'express'
import { omit } from 'lodash'
import { createUserInput } from '../schema/user.schema'
import { createUser } from '../service/user.service'
import log from '../utils/logger'

export const createUserHandler = async (req: Request<{}, {}, createUserInput['body']>, res: Response) => {
    try {
        const user = await createUser(req.body)
        return res.send(omit(user.toJSON(), "password"))
    } catch (e: any) {
        log.error(e)
        return res.status(409).send(e.message)
    }
}