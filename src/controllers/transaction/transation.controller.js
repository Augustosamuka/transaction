
import transactionServices from "../../services/transaction/transaction.services.js"

const transaction = new transactionServices()

export async function transactionPost(request, reply) {
    try {

        const { value } = request.body

        await transaction.transactionPost(value)

        reply.status(201).send()
    } catch (err) {
        reply.status(500).send()
    }
}

export async function transactionDelete(request, reply) {
    try {
        await transaction.transactionDelete()

        reply.status(204).send()
    } catch (err) {
        console.error(err)
        reply.status(500).send()
    }
}

export async function transactionGet(request, reply) {
    try {
        const transactionStatistics = await transaction.transactionStatistics()

        reply.status(200).send(transactionStatistics)
    } catch (err) {
        console.error(err)
        reply.status(500).send()
    }
}