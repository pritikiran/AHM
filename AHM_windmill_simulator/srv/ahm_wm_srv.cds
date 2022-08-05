using {ahm_wm.windmill as windmill} from '../db/table';



service ahm_windmill {

    entity ahm_device as projection on windmill.DEVICE;

    entity ahm_sensor as projection on windmill.SENSORS;

    entity ahm_capabilitiy as projection on windmill.CAPABILITIES;




}