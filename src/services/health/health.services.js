
import healthDatabase from "../../database/health/health.db.js";
import { createLogs } from "../transaction/transaction.services.js";

const db = new healthDatabase()

class healthServices {
    async checkHealth () {

        const checkDatabase = await db.checkDatabase()
        await createLogs({ message: `Saude da api checada: ${checkDatabase.status}` })

        return {
            status: checkDatabase.status,
            version: process.env.VERSION,
            time: new Date(),
            check: {
                database: checkDatabase.status
            }
        }
    }

}

export default healthServices