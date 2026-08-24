
import { create } from '../../controllers/transaction/transation.controller.js'

async function TransactionRoutes(app) {
 
    app.post('/transaction', create)
    
}

export default TransactionRoutes