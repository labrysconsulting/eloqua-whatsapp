const fs = require('fs')
const helper = require('../../helper')

module.exports = class UserService {
    constructor() {
        this.model = 'user'
    }

    async init() {

    }

    async getData() {
        return JSON.parse(fs.readFileSync(helper.fileNameWithPath(this.model), { encoding: 'utf-8' }))
    }

    async get(user) {
        return new Promise(async (resolve, reject) => {
            try {
                const key = user.getId()
                const data = await this.getData()
                resolve(data[key])
            } catch (error) {
                reject(error)
            }
        })
    }

    async create(user) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.getData()
                const key = user.getId()
                data[key] = user
                fs.writeFileSync(helper.fileNameWithPath(this.model), JSON.stringify(data), { encoding: 'utf-8' })
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }

    async update(user) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.getData()
                const key = user.getId()
                data[key] = user
                fs.writeFileSync(helper.fileNameWithPath(this.model), JSON.stringify(data), { encoding: 'utf-8' })
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }

    async delete(user) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.getData()
                const key = user.getId()
                delete data[key]
                fs.writeFileSync(helper.fileNameWithPath(this.model), JSON.stringify(data), { encoding: 'utf-8' })
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }
}