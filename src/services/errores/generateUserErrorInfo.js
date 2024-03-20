const generateUserErrorInfo = (user) => {
    return `One or more properties were incomplete or not valid.
            list of require properties:
            *first_name: need to be a String recived $(user.first_name)
            *last_name: need to be a String, recived $(user.last_name)
            *email: need to be a String, recived $(user.email)
    `
}

module.exports = {
    generateUserErrorInfo
}