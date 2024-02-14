const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { database } = require('../database');

async function loginService({ email, password }, db = database) {
    if (!email || !password) {
        return {
            error: {
                type: 'BadRequest',
                message: 'Email and password are required'
            }
        };
    }

    const user = await db.user.findFirst({
        where: {
            email
        }
    });

    if (!user) {
        return {
            error: {
                type: 'NotFound',
                message: 'User not found'
            }
        };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return {
            error: {
                type: 'BadRequest',
                message: 'Invalid password'
            }
        };
    }

    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );
        
    return {
        response: {
            message: 'User logged in successfully',
            token
        }
    };
}

module.exports = { loginService };
