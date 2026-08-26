
import transactionDatabase from "../../database/transaction/transaction.db.js"

const db = new transactionDatabase()

class transactionServices {

    async transactionPost ({ id, value }) {

        if (!id || !value) {
            return false;
        }

        const valueAccount = await db.getValueFromAccount(id)
        if (!valueAccount) {
            return false;
        }

        if (Number(valueAccount.value) < Number(value)) {
            return false;
        }

        const insetTransaction = await db.insetTransaction({ id, value, valueAccount })
        if (!insetTransaction) {
            return false;
        }

        return true;
    }

    async transactionDelete ({ id }) {
        if (!id) {
            return false;
        }

        const deleteTransactions = await db.deleteTransactions(id)
        if (!deleteTransactions) {
            return false;
        }
        
        return true;
    }

}

export default transactionServices