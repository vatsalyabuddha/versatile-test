const config = require('../config/config');
const vahanController = require('./vahanController');
const motorModel = require('../models/motorDetails');
const communicationController = require('./communicationController');
const communicationModel = require('../models/communicationModel');

async function processVahanDataFetch(req,res){
    try{
        const regNumber = req.body.regNumber;
        //check if the regNumber is already checked
        let ifExists = await motorModel.fetchByRegNumber(regNumber);

        //console.log("IF EXISTS:",ifExists[0]);

        if(ifExists && ifExists[0] && ifExists[0].id){
            //check if need to send communication again

        }else{
            console.log("Not Exists:");
            //fetch vehicle details from vahan
            let data = await vahanController.fetchRegistrationDetails(regNumber);
            data = data['data'];
            //console.log("Res Data:",data);
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

            //console.log("insurance_status:",insurance_status);
            //console.log("is_communication_required:",is_communication_required);
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
            //console.log("insert response:",res);
            let response = {
                owner_name : data['owner_name'],
                registration_number : data['registration_number'],
                registration_date : data['registration_date'],
                insurance_upto : data['insurance_upto']
            };

            //console.log("Track1");
            //sent communication if required
            if(is_communication_required){
                //console.log("Track2");
                //insert into communication table
                let insertCommuData = "("+
                            "SMS"+","+
                            "'"+ data['registration_number']+"'"+","+
                            insurance_status+","+
                            is_communication_required+")";
                let insertCommunication = await communicationModel.insertCommunicationDetails(insertCommuData);
                let communicationRes = await communicationController.sendSmsController(req,res);
                console.log("Commnuication Response:",communicationRes);

                // store communication in db
                if(communicationRes.status == 200){
                    let updateData = {
                        status_id : 1,
                        reg_number : data['registration_number']
                    };
                    let updateCommuData = await communicationModel.updateCommunicationDetails(updateData);
                    response.message ="Registration Number is uninsured. Communication sent.";
                    
                }else{
                    let updateData = {
                        status_id : -1,
                        reg_number : data['registration_number']
                    };
                    let updateCommuData = await communicationModel.updateCommunicationDetails(updateData);
                    response.message = "Registration Number is uninsured. Communication failed.";
                }
            }else{
                response.message = "Registration Number is already insured.";
            }
        }

        res.status(200).send(response);
    }catch(err){
        res.status(400).send(err);
    }
    
}

async function fetchAllMotorData(req,res){
    try{
        let data = await motorModel.fetchAllMotorData();
        console.log("Data:APIController:",data);
        res.status(200).send(data);
    }catch(err){
        res.status(400).send(err);
    }
    
}
module.exports = {processVahanDataFetch, fetchAllMotorData}