
import db from "../db.connection.js";

class accountDatabase {

    async verifyEmail (email) {
        const [rows] = await db.query(
            'SELECT email FROM accounts WHERE email =?', email
        )

        if (rows[0]) {
            return false;
        }

        return true;
    }

    async insertAccount ({ name, email, hashPassword }) {
        if (!name || !email || !hashPassword) {
            return false;
        }
        
        await db.query(
            'INSERT INTO accounts (name, email, password, value) VALUES(?, ?, ?, ?)', [name, email, hashPassword, 0]
        )

        return true;
    }

    async getAccountByEmail (email) {
        const [result] = await db.query(
            'SELECT * FROM accounts WHERE email =?', email
        )

        const user = result[0]
        if (!user) {
            return false;
        }

        return user
    }

}

export default accountDatabase