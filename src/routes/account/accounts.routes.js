
import { create } from "../../controllers/account/create.controller.js"

async function AccountRoutes(app) {
    
    app.post('/account/create', create)

}

export default AccountRoutes