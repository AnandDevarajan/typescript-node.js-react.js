import { object, string, TypeOf } from "zod"
export const createUserSchema = object({
    body: object({
        name: string({
            required_error: "Name is required"
        }),
        email: string({
            required_error: "Email is required"
        }).email('Not a valid email'),
        password: string({
            required_error: "Password is required"
        }).min(6, "Password too short-should be 6 chars minumum"),
        passwordConfirmation: string({
            required_error: "Confrim password is required"
        })
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"] //path of error
    })
})

export type createUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">

