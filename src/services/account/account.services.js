
import accountDatabase from '../../database/account/account.db.js';

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const db = new accountDatabase()

class accountServices {

    async create ({name, email, password}) {
        if (!name || !email || !password) {
            return false;
        }

        const verifyEmail = await db.verifyEmail(email)
        if (!verifyEmail) {
            return false;
        }

        const hashPassword = await bcrypt.hash(password, 10)
        
        const insertAccount = await db.insertAccount({ name, email, hashPassword})
        if (!insertAccount) {
            return false;
        }

        return true;
    }
    
    async login ({email, password}) {
        if (!email || !password) {
            return false;
        }

        const user = await db.getAccountByEmail(email)
        if (!user) {
            return false;
        }

        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return false;
        }

        const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.SECRETKEY, { 
            expiresIn: '1h' 
        })

        if (!token) {
            return false;
        }

        return { token };
    }

}

export default accountServices