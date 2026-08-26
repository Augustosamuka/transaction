
import accountServices from "../../services/account/account.services.js"

const account = new accountServices()

export async function create(request, reply) {
    try {
        const { name, email, password } = request.body
        if (!name || !email || !password) {
            return reply.status(422).send()
        }

        const createAccount = await account.create({
            name,
            email,
            password
        })

        if (!createAccount) {
            return reply.status(422).send()
        }

        reply.status(200).send()
    } catch (err) {
        reply.status(404).send()
    }
}

export async function login(request, reply) {
    try {
        const { email, password } = request.body
        if (!email || !password) {
            return reply.status(422).send()
        }

        const token = await account.login({
            email,
            password
        })

        if (!token) {
            return reply.status(422).send()
        }

        reply.status(200).send(token)
    } catch (err) {
        reply.status(401).send()
    }
}