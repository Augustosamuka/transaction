
import { create, login, teste, authenticate } from "../../controllers/account/create.controller.js"

async function AccountRoutes(app) {
    
    app.post('/account/create', create)
    app.post('/account/login', login)
    app.post('/transaction/teste', { onRequest: [authenticate] }, teste)

}

export default AccountRoutes