const fs = require('fs')
const helper = require('../../helper')

module.exports = class InstanceService {
    constructor() {
        this.model = 'instance'
    }

    async init() {

    }

    async getData() {
        return JSON.parse(fs.readFileSync(helper.fileNameWithPath(this.model), { encoding: 'utf-8' }))
    }

    async get(instance) {
        return new Promise(async (resolve, reject) => {
            try {
                const key = helper.encodeInstanceId(instance.getInstanceId())
                const data = await this.getData()
                resolve(data[key])
            } catch (error) {
                reject(error)
            }
        })
    }

    async create(instance) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.getData()
                const key = helper.encodeInstanceId(instance.getInstanceId())
                data[key] = instance
                fs.writeFileSync(helper.fileNameWithPath(this.model), JSON.stringify(data), { encoding: 'utf-8' })
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }

    async update(instance) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.getData()
                const key = helper.encodeInstanceId(instance.getInstanceId())
                data[key] = instance
                fs.writeFileSync(helper.fileNameWithPath(this.model), JSON.stringify(data), { encoding: 'utf-8' })
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }

    async delete(instance) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.getData()
                const key = helper.encodeInstanceId(instance.getInstanceId())
                delete data[key]
                fs.writeFileSync(helper.fileNameWithPath(this.model), JSON.stringify(data), { encoding: 'utf-8' })
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }
}