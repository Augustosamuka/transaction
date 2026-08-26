
import db from '../../database/db.connection.js'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

class accountServices {

    async create ({name, email, password}) {
        const [rows] = await db.query(
            'SELECT email FROM accounts WHERE email =?', email
        )

        if (rows[0]) {
            return false;
        }

        const hashPassword = await bcrypt.hash(password, 10)
        await db.query(
            'INSERT INTO accounts (name, email, password) VALUES(?, ?, ?)', [name, email, hashPassword]
        )

        return true;
    }
    
    async login ({email, password}) {
        const [result] = await db.query(
            'SELECT * FROM accounts WHERE email =?', email
        )

        const user = result[0]
        if (!user) {
            return false;
        }

        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return false;
        }

        const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.SECRETKEY, { 
            expiresIn: '1m' 
        })

        if (!token) {
            return false;
        }

        return { token };
    }

}

export default accountServices