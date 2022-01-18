const path = require('path')

module.exports = {
    encodeAppId: (id) => {
        return `app${id.toString().replace(/-/g, '')}`
    },

    encodeInstanceId: (id) => {
        return `instance${id.toString().replace(/-/g, '')}`
    },

    encodeBase64: (text) => {
        return Buffer.from(text).toString('base64')
    },

    decodeBase64: (text) => {
        return Buffer.from(text, 'base64').toString('ascii')
    },

    filePath: () => {
        return path.resolve(process.cwd(), 'labrys-core', 'dataService', 'database')
    },

    fileNameWithPath: (fileName) => {
        return path.resolve(process.cwd(), 'labrys-core', 'dataService', 'database', `${fileName}.json`)
    }
}