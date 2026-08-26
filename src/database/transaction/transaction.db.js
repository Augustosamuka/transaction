
import db from "../db.connection.js";

class transactionDatabase {
    
    async getValueFromAccount (id) {
        if (!id) {
            return false;
        }

        const [result] = await db.query(
            'SELECT value FROM accounts', id
        )

        return result[0];
    }

    async insetTransaction ({ id, value, valueAccount }) {
        if (!id || !value || !valueAccount) {
            return false;
        }

        const date = new Date()

        const countValue = (Number(valueAccount.value) - Number(value))
        if (countValue < 0) {
            return false;
        }
        
        await db.query(
            'INSERT INTO transactions (accountId, value, date) VALUES(?, ?, ?)', [ id, value.toLocaleString('pt-BR'), date ]
        )
        
        await db.query(
            'UPDATE accounts SET value = ? WHERE id = ?', [ countValue, id ]
        )

        return true;
    }

    async deleteTransactions (id) {
        if (!id) {
            return false;
        }

        const [rows] = await db.query(
            'SELECT COUNT(accountId) total FROM transactions WHERE accountId = ?', id
        )

        if (rows[0].total < 1) {
            return false;
        }

        await db.query(
            'DELETE FROM transactions WHERE accountId = ?', id
        )

        return true;
    }

}

export default transactionDatabase