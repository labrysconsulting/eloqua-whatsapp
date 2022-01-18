module.exports = class User {
    constructor({ id, email, password }) {
        this.id = id
        this.email = email
        this.password = password
    }

    getId() {
        return this.id
    }
    getEmail() {
        return this.email
    }
    getPassword() {
        return this.password
    }
}