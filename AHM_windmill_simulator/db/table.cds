namespace ahm_wm;


context windmill {

    entity DEVICE {

        key id                : String(64);
            alternateId       : String(64);
            name              : String(64);
            gatewayId         : Integer;
            creationTimestamp : Timestamp;
            online            : Boolean

    }


    entity SENSORS {

        key id          : String(64);
            alternateId : String(64);
            sensor_name : String(64)

    }


    entity CAPABILITIES {

        key id              : String(64);
            alternateId     : String(64);
            capability_name : String(64)


    }


    entity CAPABILITIES_MEASURE {

        key capability_id                     : String(64);
            capability_property_name          : String(64);
            capability_property_uom           : String(64);
            capability_property_measure_value : String(64)


    }


}
