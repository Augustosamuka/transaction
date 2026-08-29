
import { transactionPost, transactionDelete, transactionGet } from "../../controllers/transaction/transation.controller.js"

async function TransactionRoutes(app) {
    app.post('/transaction', transactionPost)
    app.delete('/transaction', transactionDelete)
    app.get('/transaction', transactionGet)
}

export default TransactionRoutes