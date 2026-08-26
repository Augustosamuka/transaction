
import fastify from 'fastify';
import Plugins from '../src/plugins/plugins.js';

import jwt from 'jsonwebtoken'

const app = fastify()

app.register(Plugins)

export default async function authenticate(request, reply) {
    try {

        const token = request.headers.authorization
        if (!token) {
            return reply.status(422).send()
        }

        const decodeJwt = jwt.verify(token, process.env.SECRETKEY)
        request.user = decodeJwt
    } catch (err) {
        reply.status(401).send()
    }
}

const init = async () => {
    try {
        await app.listen({ port: process.env.PORT })
        console.log(`Server running http://localhost:${process.env.PORT}`)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

init()