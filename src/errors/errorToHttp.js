function errorToHttp(error) {
    switch (error.type) {
        case 'BadRequest':
            return 400;
        case 'Unauthorized':
            return 401;
        case 'NotFound':
            return 404;
        case 'InternalServerError':
            return 500;
        default:
            return 500;
    }
}

module.exports = { errorToHttp };
