const builder = require('xmlbuilder')
const axios = require('axios')
const { compareSync } = require('bcrypt')

module.exports = class SmsService {
    constructor() {

    }

    async init() {

    }

    async sendSms(contacts, instanceMessage) {
        const wait = async (sec) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve()
                }, sec * 1000)
            })
        }
        // return new Promise(async (resolve, reject) => {
        //     try {

        //         for (let i = 0; i < contacts.length; i++) {
        //             //message prep
        //             let tempMessage = instanceMessage
        //             let j = 0
        //             while (tempMessage.match('<#') && tempMessage.match('#>')) {
        //                 const start = tempMessage.indexOf('<#')
        //                 const end = tempMessage.indexOf('#>') + 2
        //                 const item = tempMessage.substring(start, end)
        //                 tempMessage = tempMessage.replace(item, contacts[i]['a' + j.toString()])
        //                 j++
        //             }
        //             tempMessage = tempMessage.replace(/ /g, '%20')
        //             const params = { params: { apikey: "IrhK1SStcUO4oS5vwKZTWOWQi", language: "1", sender: "AWSAT", mobile: contacts[i].MobilePhone, message: tempMessage } }
        //             await axios.get('https://api.mpp-sms.com/api/send.aspx', params)
        //             await wait(3)
        //         }
        //         resolve()
        //     } catch (error) {
        //         reject(error)
        //     }
        // })
        return new Promise(async (resolve, reject) => {
            try {
                console.log("start message prep")
                const headers = {
                    headers: {
                        "PublicId": "180a12a8-c8b1-4276-9333-bbf31888e179",
                        "Secret": "23aa02fa1ca44101b4658e91a8d0f31c",
                        "Content-Type": "application/json"
                    }
                }

                console.log(headers)

                for (let i = 0; i < contacts.length; i++) {
                    //message prep
                    let tempMessage = instanceMessage
                    let j = 0
                    while (tempMessage.match('<#') && tempMessage.match('#>')) {
                        const start = tempMessage.indexOf('<#')
                        const end = tempMessage.indexOf('#>') + 2
                        const item = tempMessage.substring(start, end)
                        tempMessage = tempMessage.replace(item, contacts[i]['a' + j.toString()])
                        j++
                    }
                    console.log(tempMessage)
                    const body = {
                        'recipient': {
                            'contact': '+905394073673',
                            'channel': 'whatsapp'
                        },
                        'content': {
                            'type': 'template',
                            'namespace': '0fc23cf2_5207_42fb_b5d7_751574f8dee9',
                            'name': 'dev_test_non_media_shipping_template',
                            'parameters': [
                                {
                                    'default': '1 x Samsung S10+'
                                }
                            ]
                        }
                    }
                    console.log(body)
                    await axios.post('https://sandbox.apis.unifonic.com/v1/messages', body, headers)
                    await wait(3)
                }
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }
}