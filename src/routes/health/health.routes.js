
import { healthGet } from '../../controllers/health/health.controller.js'

async function HealthRoutes(app) {
    app.get('/health', healthGet)
}

export default HealthRoutes