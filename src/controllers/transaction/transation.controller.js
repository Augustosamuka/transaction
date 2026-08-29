
import transactionServices from "../../services/transaction/transaction.services.js"

const transaction = new transactionServices()

export async function transactionPost(request, reply) {
    try {
        const { value } = request.body
        if (!value || (value <= 0)) {
            return reply.status(422).send()
        }

        const transactionPost = await transaction.transactionPost(value)
        if (!transactionPost) {
            return reply.status(422).send()
        }

        reply.status(200).send()
    } catch (err) {
        reply.status(402).send()
    }
}

export async function transactionDelete(request, reply) {
    try {
        const deleteTransaction = await transaction.transactionDelete()
        if (!deleteTransaction) {
            return reply.status(422).send()
        }

        reply.status(200).send()
    } catch (err) {
        reply.status(402).send()
    }
}

export async function transactionGet(request, reply) {
    try {

        const transactionStatistics = await transaction.transactionStatistics()
        if (!transactionStatistics) {
            return reply.status(422).send()
        }

        reply.status(200).send(transactionStatistics)
    } catch (err) {
        reply.status(402).send()
    }
}