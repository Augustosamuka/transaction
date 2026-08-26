
import { transactionPost } from "../../controllers/transaction/transation.controller.js"

import authenticate from "../../index.js"

async function TransactionRoutes(app) {
    
    app.post('/transaction', { onRequest: [authenticate] }, transactionPost)

}

export default TransactionRoutes