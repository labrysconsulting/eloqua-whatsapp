const fs = require('fs')
const bcrypt = require('bcrypt')
const AppService = require('./appService')
const InstanceService = require('./instanceService')
const UserService = require('./userService')
const User = require('../../labrys-core/dataService/userService/model/user')
const helper = require('../helper')

module.exports = class DataService {
    constructor() {
        this.appService = new AppService()
        this.instanceService = new InstanceService()
        this.userService = new UserService()
        this.dataModels = ['app', 'instance', 'user']
        this.userModel = 'user'
        this.defaultUsername = 'info@labrys.com.tr'
        this.defaultPassword = 'admin1234'
    }

    async init() {
        await this.prepareData()
    }

    async prepareData() {
        for (let i = 0; i < this.dataModels.length; i++) {
            const fileName = this.dataModels[i]
            const fileExist = fs.existsSync(helper.fileNameWithPath(fileName))
            if (!fileExist) {
                const json = JSON.stringify({})
                fs.writeFileSync(helper.fileNameWithPath(fileName), json, { encoding: 'utf-8' })
            } else {
                console.log(`OK: ${fileName}.json exists!`)
            }
        }

        const users = JSON.parse(fs.readFileSync(helper.fileNameWithPath(this.userModel), { encoding: 'utf-8' }))
        if (Object.keys(users).length < 1) {
            const hashedPassword = await bcrypt.hash(this.defaultPassword, 10)
            const myUser = new User({ id: helper.encodeBase64(this.defaultUsername), email: this.defaultUsername, password: hashedPassword })
            await this.userService.create(myUser)
        }
    }
}