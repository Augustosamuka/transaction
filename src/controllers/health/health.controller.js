
import healthServices from "../../services/health/health.services.js"

const health = new healthServices()

export async function healthGet(request, reply) {
    try { 
        const checkHealth = await health.checkHealth()
        
        reply.status(200).send(checkHealth)
    } catch(err) {
        console.error(err)
        reply.status(500).send()
    }
}