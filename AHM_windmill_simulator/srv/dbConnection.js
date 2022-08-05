var hana = require("@sap/hana-client");



const Hana_DB_Config = {

    serverNode: "508d412a-9528-4d3c-8ce1-f409787bc0b9.hna0.prod-eu10.hanacloud.ondemand.com:443",

    encrypt: "true",

    sslValidateCertificate: "false",

    uid: "8415F0D2182F4EC0BE4BC862B12B2611_9AN4YJGKBM9FRFJSSLIIOZ478_RT",

    pwd: "Pq3Mtbqk-s02Z_CLjNNQ-mZ30Tj0l3sShaOGbKAQ2KHZv9BzHCau7oWYBzbfpk8Oae9hT33UeZo15RmRIenN3ajLkeUQo73OLu3ZRIwKvZSUu8IeSL76ksjj2ZrqUSDh",

}



var dbConnection = hana.createConnection();



exports.hana_dbConnection = () => {

    dbConnection.connect(Hana_DB_Config)

    return dbConnection

}