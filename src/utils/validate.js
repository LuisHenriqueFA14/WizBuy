function isValidEmail(email) {
    const emailRegexp =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegexp.test(email);
}

function isValidPassword(password) {
    return password.length >= 8;
}

module.exports = { isValidEmail, isValidPassword };
