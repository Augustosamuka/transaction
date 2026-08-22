
import fastify from 'fastify';
import Plugins from '../src/plugins/plugins.js';

const app = fastify()

app.register(Plugins)

const init = async () => {
    try {
        await app.listen({ port: 8080 })
        console.log('Server running http://localhost:8080')
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

init()