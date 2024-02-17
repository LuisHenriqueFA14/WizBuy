const { database } = require('../database');
const bcrypt = require('bcrypt');

async function deleteUserService({ password, userId }, db = database) {
    if (!password) {
        return {
            error: {
                type: 'BadRequest',
                message: 'Missing password'
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

    const isPasswordValid = await bcrypt.compare(password, userById.password);

    if (!isPasswordValid) {
        return {
            error: {
                type: 'BadRequest',
                message: 'Invalid password'
            }
        };
    }

    const deletedUser = await db.user.delete({
        where: {
            id: userId
        }
    });

    if (!deletedUser) {
        return {
            error: {
                type: 'InternalServerError',
                message: 'Failed to delete user'
            }
        };
    }

    return {
        response: {
            message: 'User deleted successfully'
        }
    }
}

module.exports = { deleteUserService };
