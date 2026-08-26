
import transactionServices from "../../services/transaction/transaction.services.js"

const transaction = new transactionServices()

export async function transactionPost(request, reply) {
    try {

        const { value } = request.body
        if (!value) {
            return reply.status(422).send()
        }
        
        const user = request.user
        if (!user) {
            return reply.status(422).send()
        }

        const transactionPost = await transaction.transactionPost({
            id: user.id,
            value
        })
        
        if (!transactionPost) {
            return reply.status(422).send()
        }

    } catch (err) {
        reply.status(402).send()
    }
}