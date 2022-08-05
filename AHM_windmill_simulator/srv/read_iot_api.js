const request = require("request-promise");
// const request_sync = require("sync-request");
var token = require('basic-auth-token');
const iot = {}

const BasicToken = token("root", "fQmSxvtb8BgGZ09");

//Get IOT Devices

iot.getIOTDevices = async () => {

    device_Array = [];

    let result = await getIOT_Devices_Sensors();

    result.forEach(element => {
        var dateTime = new Date(element.creationTimestamp).toISOString().split('T')
        var date =  dateTime[0];
        var time = dateTime[1].slice(0,8)
        device_Array.push({
            id: element.id,
            alternateId: element.alternateId,
            name: element.name,
            gatewayId: element.gatewayId,
            creationTimestamp: (date + ' ' + time),
            online: element.online           
        })
 

    });

    return device_Array;

}


async function getIOT_Devices_Sensors() {

    let option = {

        method: "GET",

        uri: "https://9941ae3f-8001-4c30-a61d-35c59674fb19.eu10.cp.iot.sap/9941ae3f-8001-4c30-a61d-35c59674fb19/iot/cockpit/core/tenant/161142174/devices",

        headers: {

            'Authorization': 'Basic ' + BasicToken

        },

        json: true

    }

    return request(option);

}


module.exports = iot