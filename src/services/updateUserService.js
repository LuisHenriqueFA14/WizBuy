const { database } = require('../database');
const { isValidPassword } = require('../utils/validate');
const bcrypt = require('bcrypt');

async function updateUserService({ name, password, userId }, db = database) {
    if (!name && !password) {
        return {
            error: {
                type: 'BadRequest',
                message: 'Missing name or password'
            }
        };
    }

    const userById = await db.user.findFirst({
        where: {
            id: userId
        }
    });

    if (!userById) {
        return {
            error: {
                type: 'NotFound',
                message: 'User not found'
            }
        };
    }

    let newPassword;

    if (password) {
        if (!isValidPassword(password)) {
            return {
                error: {
                    type: 'BadRequest',
                    message: 'Invalid password'
                }
            };
        }

        newPassword = await bcrypt.hash(password, 8);

        if (!newPassword) {
            return {
                error: {
                    type: 'InternalServerError',
                    message: 'Failed to hash password'
                }
            };
        }
    } else {
        newPassword = userById.password;
    }

    const updatedUser = await db.user.update({
        where: {
            id: userId
        },
        data: {
            name: name || userById.name,
            password: newPassword
        }
    });

    if (!updatedUser) {
        return {
            error: {
                type: 'InternalServerError',
                message: 'Failed to update user'
            }
        };
    }

    return {
        response: {
            message: 'User updated successfully',
            id: updatedUser.id
        }
    }
}

module.exports = { updateUserService };
