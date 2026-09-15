
import fastify from 'fastify';
import Plugins from '../src/plugins/plugins.js';

const app = fastify({
    trustProxy: true,
    bodyLimit: 1048576,
    disableRequestLogging: true
})

app.register(Plugins)

app.server.keepAliveTimeout = 65000
app.server.headersTimeout = 66000

const init = async () => {
    try {
        await app.listen({ port: process.env.PORT })
        console.log(`Server running http://localhost:${ process.env.PORT }`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

init()