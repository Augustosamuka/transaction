
import db from "../../database/db.connection.js"

class createAccount {

    async create ({name, email, password}) {
        
        const [result] = await db.query("INSERT INTO accounts (name, email, password) VALUES(?, ?, ?)",[name,email, password])
        
    }

}

export default createAccount