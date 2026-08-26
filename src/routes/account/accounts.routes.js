
import { create, login } from "../../controllers/account/account.controller.js"

import authenticate from "../../index.js"

async function AccountRoutes(app) {
    
    app.post('/account/create', create)
    app.post('/account/login', login)
    //app.post('/transaction/teste', { onRequest: [authenticate] }, teste)

}

export default AccountRoutes