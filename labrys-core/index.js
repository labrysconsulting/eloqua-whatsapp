const DataService = require('./dataService')
const EloquaService = require('./eloquaService')
const SmsService = require('./smsService')

class LabrysCore {
    constructor() {
        this.dataService = new DataService()
        this.eloquaService = new EloquaService()
        this.smsService = new SmsService()
    }

    async init() {
        await this.dataService.init()
    }
}

const labrysCore = new LabrysCore()
module.exports = labrysCore