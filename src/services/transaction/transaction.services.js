
import transactionDatabase from "../../database/transaction/transaction.db.js"

const db = new transactionDatabase()

class transactionServices {

    async transactionPost ({ id, value }) {

        const valueAccount = await db.getValueFromAccount(id)
        if (!valueAccount) {
            return false;
        }

        if (Number(valueAccount.value) < Number(value)) {
            return false;
        }

        const insetTransaction = db.insetTransaction({ id, value, valueAccount })
        if (!insetTransaction) {
            return false;
        }

        return true;
    }

}

export default transactionServices