const { prisma } = require('../database');
const bcrypt = require('bcrypt');

const { isValidEmail, isValidPassword } = require('../utils/validate');

async function createUserService(name, email, password) {
    if(!name || !email || !password) {
        return {
            error: {
                type: 'BadRequest',
                message: 'Name, email and password are required'
            }
        };
    }

    if(!isValidEmail(email)) {
        return {
            error: {
                type: 'BadRequest',
                message: 'Invalid email'
            }
        };
    }

    if(!isValidPassword(password)) {
        return {
            error: {
                type: 'BadRequest',
                message: 'Invalid password'
            }
        };
    }

    const emailInUse = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if(emailInUse) {
        return {
            error: {
                type: 'BadRequest',
                message: 'Email already in use'
            },
        };
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    if(!hashedPassword) {
        return {
            error: {
                type: 'InternalServerError',
                message: 'Failed to hash password'
            }
        };
    }

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    if(!user) {
        return {
            error: {
                type: 'InternalServerError',
                message: 'Failed to create user'
            }
        };
    }

    return {
        response: {
            message: 'User created successfully',
            id: user.id
        }
    };
}

module.exports = { createUserService };
