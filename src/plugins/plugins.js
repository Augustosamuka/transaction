
import TransactionRoutes from "../routes/transaction/transaction.routes.js"

function Plugins(app) {
    app.register(TransactionRoutes)
}

export default Plugins