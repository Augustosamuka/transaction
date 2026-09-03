
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

        await createLogs({ message: `O usuario transferiu o valor de R$ ${value.toLocaleString('pt-BR')}` })
    }

    async transactionDelete () {
        const deleteTransaction = await db.deleteTransaction()
        if (!deleteTransaction) {
            throw new Error('Error deleting the transactions')
        }

        await createLogs({ message: 'O usuario deletou todas as transações' })
    }

    async transactionStatistics () {
        const statisticsTransaction = await db.statisticsTransaction()
        if (!statisticsTransaction) {
            throw new Error('Error viewing statistics')
        }

        const limitStatistics = Date.now() - 60000
        const latestValues = statisticsTransaction.filter(item => {
            const dataTime = new Date(item.date).getTime()

            return dataTime >= limitStatistics
        })

        if (latestValues.length <= 0) {
            await createLogs({message: `O usuario consultou as estatísticas e não obteve resultado` })
            return {
                count: '0',
                sum: '0',
                avg: '0',
                min: '0',
                max: '0'
            }
        }

        const count = latestValues.length
        const values = latestValues.map(item => Number(item.value))
        
        const sum = values.reduce((accumulator, value) => accumulator + value, 0)
        const avg = Math.floor((sum / count)) || 0

        const min = Math.min(...values)
        const max = Math.max(...values)

        await createLogs({ message: `O usuario consultou as estatísticas da suas transações.` })

        return {
            count: count.toLocaleString('pt-BR'),
            sum: sum.toLocaleString('pt-BR'),
            avg: avg.toLocaleString('pt-BR'),
            min: min.toLocaleString('pt-BR'),
            max: max.toLocaleString('pt-BR')
        }
    }
}

export default transactionServices

async function createLogs({ message }) {
    if (!message) {
        return 'Error saving the log'
    }

    const insertLog = await db.createLogs(message)
    if (!insertLog) {
        throw new Error('Error saving the log')
    }
}