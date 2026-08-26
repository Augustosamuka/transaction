
import db from "../db.connection.js";

class transactionDatabase {
    
    async getValueFromAccount (id) {
        const [result] = await db.query(
            'SELECT value FROM accounts', id
        )

        return result[0];
    }

    async insetTransaction ({ id, value, valueAccount }) {
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

}

export default transactionDatabase