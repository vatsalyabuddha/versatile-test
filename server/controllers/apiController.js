const config = require('../config/config');
const vahanController = require('./vahanController');
const motorModel = require('../models/motorDetails')

async function processVahanDataFetch(regNumber){
    //check if the regNumber is already checked
    let ifExists = await motorModel.fetchByRegNumber(regNumber);

    console.log("IF EXISTS:",ifExists[0]);

    if(ifExists && ifExists[0] && ifExists[0].id){
        //check if need to send communication again

    }else{
        //fetch vehicle details from vahan
        let data = await vahanController.fetchRegistrationDetails(regNumber);
        data = data['data'];
        console.log("Res Data:",data);
        // handling Uninsured vehicle
        let current_date = new Date();
        let insurance_upto_date = new Date(data['registration_date']);

        let insurance_status,is_communication_required;
        if(insurance_upto_date <  current_date){
            insurance_status = config.status.insuranceExpired;
            is_communication_required = true;
        }else{
            insurance_status = config.status.insuranceValid; 
            is_communication_required = false;
        } 

        // process motor details
        let insertData = "("+
                        "'"+ data['registration_number']+"'"+","+
                        "'"+  data['maker_model']+"'"+","+
                        insurance_status+","+
                        "'"+  data['owner_name']+"'"+","+
                        "'"+  data['rto_code']+"'"+","+
                        "'"+  data['rto_name']+"'"+","+
                        "'"+  data['rto_city_id']+"'"+","+
                        "'"+  data['rto_city_name']+"'"+","+
                        "'"+  data['rto_state_id']+"'"+","+
                        "'"+  data['rto_state_name']+"'"+","+
                        "'"+  data['registration_date']+"'"+","+
                        "'"+  data['insurance_upto']+"'"+","+
                        "'"+ data['fitness_upto']+"'"+","+
                        is_communication_required+")";
        //console.log("insertData:",insertData);
        // store in Db
        let res = await motorModel.insertIntoMotorDetails(insertData);

        let response;
        //sent communication if required
        if(is_communication_required){
            response = {
                message : "Registration Number is uninsured. Communication Sent"
            }
        }else{
            response = {
                message : "Registration Number insured. Communication Sent"
            }
        }
    }

    return response;
}

async function fetchAllMotorData(){
    let data = await motorModel.fetchAllMotorData();
    console.log("Data:APIController:",data);
    return data;
}
module.exports = {processVahanDataFetch, fetchAllMotorData}