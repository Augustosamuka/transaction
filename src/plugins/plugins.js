
import TransactionRoutes from "../routes/transaction/transaction.routes.js"
import HealthRoutes from "../routes/health/health.routes.js"

function Plugins(app) {
    app.register(TransactionRoutes)
    app.register(HealthRoutes)
}

export default Plugins