
import transactionDatabase from "../../database/transaction/transaction.db.js"

const db = new transactionDatabase()

class transactionServices {

    async transactionPost (value) {

        if (!value) {
            return false
        }

        const insetTransaction = await db.insetTransaction(value)
        if (!insetTransaction) {
            return false
        }

        return true
    }

    async transactionDelete () {

        const deleteTransaction = await db.deleteTransaction()
        if (!deleteTransaction) {
            return false
        }
        
        return true
    }

    async transactionStatistics () {

        const statisticsTransaction = await db.statisticsTransaction()
        if (!statisticsTransaction) {
            return false
        }

        const count = statisticsTransaction.length

        const sum = statisticsTransaction.reduce( (accumulator, value) => {
            const numberClean = value.value.replace('.', '')
            return accumulator + Number(numberClean)
        }, 0)

        const avg = Math.floor((sum / count)) || 0

        return {
            count: Number(count.toLocaleString('pt-BR')),
            sum: Number(sum.toLocaleString('pt-BR')),
            avg: Number(avg.toLocaleString('pt-BR'))
        }
    }

}

export default transactionServices