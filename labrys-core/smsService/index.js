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
                        "Authorization": "3259b9db-c7a8-4f2f-a628-5c158638b761",
                        "Content-Type": "application/json",                  
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
                        "CampaignId": contacts[i].Campaignid,
                        "To": {
                            "PhoneNumber": contacts[i].MobilePhone
                        },
                        "Parameters":{
                            "order_number": contacts[i].Param1,
                            "amount":contacts[i].Param2,
                            "parameter3": contacts[i].Param3,
                            "parameter4": contacts[i].Param4
                        },
                        "Variables":{
                            "order_number":"1234",
                            "customer_id":"my_customer_id"
                        },
                        "Callback":{
                            "URL":"",
                            "State":{
                                "a":"b",
                                "c":"d"
                            }
                        }
                    }
                    console.log(body)
                    await axios.post('https://daralarkan.mena.verloop.io/api/v1/Campaign/SendMessage', body, headers)
                    await wait(3)
                }
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }
}