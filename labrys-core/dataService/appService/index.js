const fs = require('fs')
const helper = require('../../helper')

module.exports = class AppService {
    constructor() {
        this.model = 'app'
    }

    async init() {

    }

    async getData() {
        return JSON.parse(fs.readFileSync(helper.fileNameWithPath(this.model), { encoding: 'utf-8' }))
    }

    async get(app) {
        return new Promise(async (resolve, reject) => {
            try {
                const key = helper.encodeAppId(app.getAppId())
                const data = await this.getData()
                resolve(data[key])
            } catch (error) {
                reject(error)
            }
        })
    }

    async create(app) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.getData()
                const key = helper.encodeAppId(app.getAppId())
                data[key] = app
                fs.writeFileSync(helper.fileNameWithPath(this.model), JSON.stringify(data), { encoding: 'utf-8' })
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }

    async update(app) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.getData()
                const key = helper.encodeAppId(app.getAppId())
                data[key] = app
                fs.writeFileSync(helper.fileNameWithPath(this.model), JSON.stringify(data), { encoding: 'utf-8' })
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }

    async delete(app) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.getData()
                const key = helper.encodeAppId(app.getAppId())
                delete data[key]
                fs.writeFileSync(helper.fileNameWithPath(this.model), JSON.stringify(data), { encoding: 'utf-8' })
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }
}