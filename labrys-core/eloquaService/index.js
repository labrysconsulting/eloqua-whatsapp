const axios = require('axios')

module.exports = class EloquaService {
    constructor() {
        this.recordDefinition = {
            recordDefinition: {
                ContactID: '{{Contact.Id}}',
                EmailAddress: '{{Contact.Field(C_EmailAddress)}}',
                MobilePhone: '{{Contact.Field(C_MobilePhone)}}'
            },
            requiresConfiguration: true
        }
        this.token = 'Basic ' + Buffer.from('KUWAITANDMIDDLEEASTFINANCIALINVESTMENTCO\\Hussin.Khalil:Kmefic@1234').toString('base64')
    }

    async init() {

    }

    getRecordDefinition() {
        return this.recordDefinition
    }

    getHeader() {
        return {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Authorization": this.token
            }
        };
    }

    async getContactFields() {
        return new Promise(async (resolve, reject) => {
            try {
                const header = this.getHeader()
                const contactFields = await axios.get('https://secure.p06.eloqua.com/api/bulk/2.0/contacts/fields', header);
                resolve(contactFields)
            } catch (error) {
                reject(error)
            }
        })
    }

    generateRecordDefinition(message, mobilePhoneField) {
        const rdArray = new Array()

        while (message.match('<#') && message.match('#>')) {
            const start = message.indexOf('<#') + 2
            const end = message.indexOf('#>')
            const item = message.substring(start, end)
            const myItem = "{{Contact.Field(" + item + ")}}"
            rdArray.push(myItem)
            message = message.replace('<#').replace('#>')
        }
        var rdJSON = {
            "recordDefinition": {
                "MobilePhone": "{{Contact.Field(" + mobilePhoneField + ")}}"
            },
            "requiresConfiguration": false
        }

        for (var i = 0; i < rdArray.length; i++) {
            rdJSON.recordDefinition['a' + i] = rdArray[i]
        }
        return rdJSON
    }

    async updateRecordDefinition(instanceId, rdJSON) {
        return new Promise(async (resolve, reject) => {
            try {
                const header = this.getHeader()
                await axios.put('https://secure.p06.eloqua.com/api/cloud/1.0/actions/instances/' + instanceId, rdJSON, header)
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }

    async generateNotification(instance, contacts) {
        return new Promise(async (resolve, reject) => {
            try {
                const header = this.getHeader()
                let data = {
                    "name": "Labrys SMS Action Response Bulk Import",
                    "updateRule": "always",
                    "fields": {
                        "MobilePhone": "{{Contact.Field(C_MobilePhone)}}"
                    },
                    "syncActions": [
                        {
                            "destination": "{{ActionInstance(" + instance.getInstanceId().replace(/-/g, '') + ").Execution[" + instance.getExecutionId() + "]}}",
                            "action": "setStatus",
                            "status": "complete"
                        }
                    ],
                    "identifierFieldName": "MobilePhone"
                }

                let importCompleted = false
                let response = await axios.post('https://secure.p06.eloqua.com/api/bulk/2.0/contacts/imports', data, header)
                if (response.status == 201) {
                    const url = 'https://secure.p06.eloqua.com/api/bulk/2.0' + response.data.uri + '/data'
                    data = {
                        "syncedInstanceURI": response.data.uri
                    }

                    response = await axios.post(url, contacts, header)
                    if (response.status == 204) {
                        response = await axios.post('https://secure.p06.eloqua.com/api/bulk/2.0/syncs', data, header)
                        if (response.status == 201) {
                            response = await axios.get('https://secure.p06.eloqua.com/api/bulk/2.0' + response.data.uri, header)
                            if (response.status == 200) {
                                importCompleted = true
                            }
                        }
                    }
                }
                console.log("import completed:", importCompleted)
                if (importCompleted) {
                    resolve()
                } else {
                    reject('Something went wrong :(')
                }
            } catch (error) {
                reject(error)
            }
        })
    }
}