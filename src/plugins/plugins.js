
import AccountRoutes from "../routes/account/accounts.routes.js"
import TransactionRoutes from "../routes/transaction/transaction.routes.js"

function Plugins(app) {
    app.register(AccountRoutes)
    app.register(TransactionRoutes)
}

export default Plugins