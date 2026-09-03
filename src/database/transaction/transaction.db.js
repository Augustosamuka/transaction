
import db from "../db.connection.js";

class transactionDatabase {

    async insetTransaction (value) {
        if (!value) {
            return false
        }

        const date = new Date()

        await db.query(
            'INSERT INTO transactions (value, date) VALUES(?, ?)', [ value, date ]
        )
        
        return true
    }

    async deleteTransaction () {

        const [rows] = await db.query(
            'SELECT COUNT(*) total FROM transactions'
        )

        if (rows[0].total < 1) {
            return false
        }

        await db.query(
            'DELETE FROM transactions'
        )

        return true
    }

    async statisticsTransaction () {

        const [result] = await db.query(
            'SELECT * FROM transactions'
        )

        return result
    }

    async createLogs(message) {
        if (!message) {
            return false
        }

        const date = new Date()

        await db.query(
            'INSERT INTO logs (message, date) VALUES(?, ?)', [ message, date ]
        )
        
        return true
    }
}

export default transactionDatabase