
import transactionDatabase from "../../database/transaction/transaction.db.js"

const db = new transactionDatabase()

class transactionServices {

    async transactionPost (value) {
        if (!value) {
            throw new Error('Value not found')
        }

        const insetTransaction = await db.insetTransaction(value)
        if (!insetTransaction) {
            throw new Error('Error inserting into the database')
        }

        createLogs({ message: `O usuario transferiu o valor de R$ ${value.toLocaleString('pt-BR')}` }).catch(err => console.log('Falha ao salvara log:', err))
    }

    async transactionDelete () {
        const deleteTransaction = await db.deleteTransaction()
        if (!deleteTransaction) {
            throw new Error('Error deleting the transactions')
        }

        createLogs({ message: 'O usuario deletou todas as transações' }).catch(err => console.log('Falha ao salvara log:', err))
    }

    async transactionStatistics () {
        const statisticsTransaction = await db.statisticsTransaction()
        if (!statisticsTransaction) {
            throw new Error('Error viewing statistics')
        }

        if (statisticsTransaction.length <= 0) {
            createLogs({message: `O usuario consultou as estatísticas e não obteve resultado` }).catch(err => console.log('Falha ao salvara log:', err))
            return {
                count: '0',
                sum: '0',
                avg: '0',
                min: '0',
                max: '0'
            }
        }

        const count = statisticsTransaction.length
        const values = statisticsTransaction.map(item => Number(item.value))
        
        const sum = values.reduce((accumulator, value) => accumulator + value, 0)
        const avg = Math.floor((sum / count)) || 0

        const min = Math.min(...values)
        const max = Math.max(...values)

        createLogs({ message: `O usuario consultou as estatísticas da suas transações.` }).catch(err => console.log('Falha ao salvara log:', err))

        return {
            count: count.toLocaleString('pt-BR'),
            sum: sum.toLocaleString('pt-BR'),
            avg: avg.toLocaleString('pt-BR'),
            min: min.toLocaleString('pt-BR'),
            max: max.toLocaleString('pt-BR')
        }
    }
}

export async function createLogs({ message }) {
    if (!message) {
        return 'Error saving the log'
    }

    const insertLog = await db.createLogs(message)
    if (!insertLog) {
        throw new Error('Error saving the log')
    }
}

export default transactionServices
