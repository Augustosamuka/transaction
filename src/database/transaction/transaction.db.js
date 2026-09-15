
import db from "../db.connection.js";

class transactionDatabase {

    async insetTransaction (value) {
        await db.query(
            'INSERT INTO transactions (value) VALUES(?)', [ value ]
        )
    }

    async deleteTransaction () {

        const [rows] = await db.query(
            'SELECT COUNT(*) total FROM transactions'
        )

        if (rows[0].total < 1) {
            return false
        }

        await db.query('DELETE FROM transactions')
        return true
    }

    async statisticsTransaction () {

        const [result] = await db.query(
            'SELECT * FROM transactions WHERE date >= NOW() - INTERVAL 60 SECOND'
        )

        return result
    }

    async createLogs(message) {
        if (!message) {
            return false
        }

        await db.query(
            'INSERT INTO logs (message, date) VALUES(?, NOW())', [ message ]
        )

        return true
    }
}

export default transactionDatabase