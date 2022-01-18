const Instance = require('../../labrys-core/dataService/instanceService/model/instance')

module.exports = {
    create: async (req, res) => {
        try {
            if (!req.query.instanceId) {
                return res.status(400).json({ status: "bad request" })
            }
            const instance = new Instance(req.query)
            await req.labrysCore.dataService.instanceService.create(instance)
            const recordDefinition = req.labrysCore.eloquaService.getRecordDefinition()
            res.status(200).json(recordDefinition)
        } catch (error) {
            res.status(500).json({ status: "error", message: error })
        }
    },

    configure: async (req, res) => {
        try {
            if (!req.query.instanceId) {
                return res.status(404).json({ status: "not found" })
            }
            const instance = new Instance(req.query)
            const myInstance = await req.labrysCore.dataService.instanceService.get(instance)
            const contactFields = await req.labrysCore.eloquaService.getContactFields()
            var data = {
                "contactFields": contactFields.data.items,
                "instance": myInstance
            }

            res.render('instance', data)
        } catch (error) {
            res.status(500).json({ status: "error", message: error })
        }
    },

    saveInstance: async (req, res) => {
        try {
            if (!req.query.instanceId) {
                return res.status(404).json({ status: "not found" })
            } else if (!req.body.textareaMessage || !req.body.selectMobileNumber) {
                return res.status(400).json({ status: "bad request" })
            }
            const instance = new Instance(req.query)
            let myInstance = await req.labrysCore.dataService.instanceService.get(instance)
            myInstance = new Instance({ ...myInstance, message: req.body.textareaMessage, mobilePhoneField: req.body.selectMobileNumber })
            await req.labrysCore.dataService.instanceService.update(myInstance)

            const recordDefinition = req.labrysCore.eloquaService.generateRecordDefinition(req.body.textareaMessage, req.body.selectMobileNumber)
            await req.labrysCore.eloquaService.updateRecordDefinition(myInstance.getInstanceId(), recordDefinition)

            res.status(200).json({ status: "success" })
        } catch (error) {
            res.status(500).json({ status: "error", message: error })
        }
    },

    delete: async (req, res) => {
        try {
            if (!req.query.instanceId) {
                return res.status(400).json({ status: "bad request" })
            }
            const instance = new Instance(req.query)
            await req.labrysCore.dataService.instanceService.delete(instance)
            res.status(200).json({ status: "success" })
        } catch (error) {
            res.status(500).json({ status: "error", message: error })
        }
    },

    notification: async (req, res) => {
        try {
            if (!req.query.instanceId || !req.query.executionId || !req.body.items) {
                return res.status(400).json({ status: "bad request" })
            }
            const instance = new Instance(req.query)
            console.log(instance)
            const myInstance = await req.labrysCore.dataService.instanceService.get(instance)
            console.log(myInstance)
            await req.labrysCore.smsService.sendSms(req.body.items, myInstance.message)
            await req.labrysCore.eloquaService.generateNotification(instance, req.body.items)
            res.status(200).json({ status: "success" })
        } catch (error) {
            res.status(500).json({ status: "error", message: error })
        }
    }
}