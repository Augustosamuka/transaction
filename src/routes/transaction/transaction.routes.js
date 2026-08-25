
import { create } from '../../controllers/transaction/transaction.controller.js'

async function TransactionRoutes(app) {
 
    app.post('/transaction', create)
    
}

export default TransactionRoutes