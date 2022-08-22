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
            online: element.online,
            sensor_name:element.sensor_name,         
                               
        })
 

    });

    return device_Array;

}

iot.getIOTSensors = async () => {

    device_Array = [];

    let result = await getIOT_Sensors_Sensors();

    result.forEach(element => {
        
        device_Array.push({
            id: element.id,
            alternateId: element.alternateId,
            name:element.name
        
                               
        })
 

    });

    return device_Array;

}


iot.getIOTCapabilities = async () => {

    device_Array = [];

    let result = await getIOT_Capabilities_Sensors();

    result.forEach(element => {
        
        device_Array.push({
            id: element.id,
            alternateId: element.alternateId,
            name:element.name
                               
        })
 

    });

    return device_Array;

}

iot.getIOTCapabilitiesMeasure = async () => {

    device_Array = [];

    let result = await getIOT_Capabilities_Sensors();

    result.map((item) => {
        var device_pro = []
        for(let i = 0; i < item.properties.length; i++) {
            device_pro.push({
                "name": item.properties[i].name,
                "dataType": item.properties[i].dataType,
                "unitOfMeasure": item.properties[i].unitOfMeasure
            })
        }
        device_Array.push({
            "capability_id": item.id,
            "capability_property_name": device_pro[0].name,
            "capability_property_uom": device_pro[0].dataType,
            "capability_property_measure_value": device_pro[0].unitOfMeasure            
        })
    })    

   

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
async function getIOT_Sensors_Sensors() {

    let option = {

        method: "GET",

        uri: "https://9941ae3f-8001-4c30-a61d-35c59674fb19.eu10.cp.iot.sap/9941ae3f-8001-4c30-a61d-35c59674fb19/iot/core/api/v1/tenant/161142174/sensors?skip=0&top=100",

        headers: {

            'Authorization': 'Basic ' + BasicToken

        },

        json: true

    }

    return request(option);

}
async function getIOT_Capabilities_Sensors() {

    let option = {

        method: "GET",

        uri: "https://9941ae3f-8001-4c30-a61d-35c59674fb19.eu10.cp.iot.sap/9941ae3f-8001-4c30-a61d-35c59674fb19/iot/core/api/v1/tenant/161142174/capabilities?skip=0&top=100",

        headers: {

            'Authorization': 'Basic ' + BasicToken

        },

        json: true

    }

    return request(option);

}


module.exports = iot