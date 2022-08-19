const cds = require('@sap/cds')
const { getIOTDevices } = require('./read_iot_api')
const { getIOTSensors } = require('./read_iot_api')
const { getIOTCapabilities, getIOTCapabilitiesMeasure } = require('./read_iot_api')
const db = require('./dbQuery')

const getDevice = async (req, res, next) => {
    try {
        let result = await getIOTDevices()
        console.log(result)

        result.forEach(async (element) => {


            db.execute_query(`UPSERT "8415F0D2182F4EC0BE4BC862B12B2611"."ahm_iot_wm_devices" VALUES ( 
                '${element.id}' ,
                '${element.alternateId}' ,
                '${element.name}' ,       
                 ${element.gatewayId},
                '${element.creationTimestamp}' ,
                 ${element.online}
                )  WITH PRIMARY KEY ;`);




        });
    } catch (err) {
        console.log(err)
    }
}

const getSensors = async (req, res, next) => {
    try {
        let result = await getIOTSensors()
        console.log(result)

        result.forEach(async (element) => {


            db.execute_query(`UPSERT "8415F0D2182F4EC0BE4BC862B12B2611"."ahm_iot_wm_sensor" VALUES ( 
                '${element.id}' ,
                '${element.alternateId}' ,
                '${element.name}'        
                 
                )  WITH PRIMARY KEY ;`);




        });
    } catch (err) {
        console.log(err)
    }
}

const getCapabilities = async (req, res, next) => {
    try {
        let result = await getIOTCapabilities()

        console.log(result)

        result.forEach(async (element) => {


            db.execute_query(`UPSERT "8415F0D2182F4EC0BE4BC862B12B2611"."ahm_iot_wm_capabilities" VALUES ( 
                '${element.id}' ,
                '${element.alternateId}' ,
                '${element.name}'        
                 
                )  WITH PRIMARY KEY ;`);
        });

    } catch (err) {
        console.log(err)
    }
}

const getCapabilitiesMeasure = async (req, res, next) => {
    try {

        let result = await getIOTCapabilitiesMeasure()
        console.log(result)

        result.forEach(async (element) => {
            db.execute_query(`UPSERT "8415F0D2182F4EC0BE4BC862B12B2611"."ahm_iot_wm_capabilities_measure" VALUES ( 
                '${element.capability_id}' ,
                '${element.capability_property_name}'
                '${element.capability_property_uom}',
                '${element.capability_property_measure_value}'
                              
                )  WITH PRIMARY KEY ;`);




        });
    } catch (err) {
        console.log(err)
    }
}


module.exports = cds.service.impl(function () {

    this.before('READ', 'ahm_device', each => { getDevice() })
    this.before('READ', 'ahm_sensor', each => { getSensors() })
    this.before('READ', 'ahm_capabilitiy', each => { getCapabilities() })
    this.before('READ', 'ahm_capabilitiy_measure', each => { getCapabilitiesMeasure() })

})