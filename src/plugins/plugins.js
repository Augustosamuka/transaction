
import TransactionRoutes from "../routes/transaction/transaction.js"

function Plugins(app) {
    app.register(TransactionRoutes)
}

export default Plugins