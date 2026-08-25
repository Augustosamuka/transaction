
import createAccount from "../../services/account/account.services.js"

const account = new createAccount()

export async function create(request, reply) {
    try {
        
        const { name, email, password } = request.body

        if (!name || !email || !password) {
            return reply.status(422).send()
        }

        await account.create({
            name,
            email,
            password
        })

        reply.status(200).send()
    } catch (err) {
        reply.status(404).send()
    }
}