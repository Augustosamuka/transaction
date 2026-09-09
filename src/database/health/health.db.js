
import db from '../../database/db.connection.js';

class healthDatabase {
    async checkDatabase () {
        try {
            await db.query('SELECT 1')
            return { status: 'ok' }
        } catch(err) {
            return { status: 'fail' }
        }
    }
}

export default healthDatabase