
import fastify from 'fastify';
import Plugins from '../src/plugins/plugins.js';

const app = fastify()

app.register(Plugins)

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