const cds = require('@sap/cds')
const { getIOTDevices } = require('./read_iot_api')
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

const writeDevice = async (req, res, next) => {
    try {
        let result = getDevice()
        console.log(result)

        result.forEach(async (element) => {


            db.execute_query(`UPSERT "8415F0D2182F4EC0BE4BC862B12B2611"."ahm_iot_wm_devices" VALUES ( 
                 '${element.id}' ,
                 '${element.alternateId}' ,
                 '${element.name}' ,       
                  ${element.gatewayId},
                 '${element.creationTimestamp}' ,
                 Boolean('${element.online}')
                 )  WITH PRIMARY KEY ;`);

        });
    } catch (err) {

    }
}

module.exports = cds.service.impl(function () {

    this.before('READ', 'ahm_device', each => { getDevice() })

})