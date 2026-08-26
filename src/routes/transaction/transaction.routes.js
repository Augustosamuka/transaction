
import { transactionPost, transactionDelete } from "../../controllers/transaction/transation.controller.js"

import authenticate from "../../index.js"

async function TransactionRoutes(app) {
    
    app.post('/transaction', { onRequest: [authenticate] }, transactionPost)
    app.delete('/transaction/:id', { onRequest: [authenticate] }, transactionDelete)

}

export default TransactionRoutes