const App = require('../../labrys-core/dataService/appService/model/app')

module.exports = {
    enable: async (req, res) => {
        try {
            if (!req.query.appId || !req.query.installId) {
                return res.status(400).json({ status: "bad request" })
            }
            const app = new App(req.query)
            await req.labrysCore.dataService.appService.create(app)
            res.status(200).json({ status: "success" })
        } catch (error) {
            res.status(500).json({ status: "error", message: error })
        }
    },

    configure: async (req, res) => {
        try {
            res.render('index')
        } catch (error) {
            res.status(500).json({ status: "error", message: error })
        }
    },

    status: async (req, res) => {
        try {
            if (!req.query.appId) {
                return res.status(400).json({ status: "bad request" })
            }
            const app = new App(req.query)
            const myApp = await req.labrysCore.dataService.appService.get(app)
            if (myApp) {
                res.status(200).json({ status: "success" })
            } else {
                res.status(404).json({ status: "not found" })
            }
        } catch (error) {
            res.status(500).json({ status: "error", message: error })
        }
    },

    uninstall: async (req, res) => {
        try {
            if (!req.query.appId) {
                return res.status(400).json({ status: "bad request" })
            }
            const app = new App(req.query)
            await req.labrysCore.dataService.appService.delete(app)
            res.status(200).json({ status: "success" })
        } catch (error) {
            res.status(500).json({ status: "error", message: error })
        }
    }
}