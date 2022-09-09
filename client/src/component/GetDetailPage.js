import React, { useState } from 'react'
import Button from './Button'
import configs from './configs'
import Dropdown from './Dropdown'
import axios from "axios"


const GetDetailPage = (props) => {
    const [input, setInput] = useState({ to: "", from: "" })
    const [isUserPopup, setUserPopup] = useState(false);
    const [redId, setRegId] = useState("");
    const [userData, setUserData] = useState("")
    const [loader, setLoader] = useState(false);
    const [error, serError] = useState("")

    const cityList = configs.cityList;



    const handleChange = (e) => {
        let name = e.target.name;
        switch (name) {
            case "date_to": setInput(prev => ({ ...prev, to: e.target.value })); break;
            case "date_from": setInput(prev => ({ ...prev, from: e.target.value })); break;
            default: return
        }
    }

    const hitSubmitAPI = () => {
        //hit reg num api here
    }

    const gotoHome = () => props.gotoHome();

    const showloader=()=>{
        var modal = document.getElementById("myModalUserdata");
        modal.style.display = "block";

    }

    const removeLoader=()=>{
        setTimeout(() => {
            var modal = document.getElementById("myModalUserdata");
            modal.style.display = "none";
            
        }, 3000);
    }

    const onChangeFile = (e) => {
        setUserData("")
        showloader()
        serError("")

        console.log(e)
        console.log(e.target.files);
        // const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        let url = `${configs.regIDurl}/api/init-process`;
        let key = "number_plate_image";
        let uploadData = new FormData();
        uploadData.append(key, e.target.files[0])
        axios({
            method: "post",
            url: url,
            data: uploadData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                //handle success
                console.log(response);
                removeLoader()
                setUserData(response.data)
            })
            .catch(function (response) {
                //handle error
                console.log(response);
                serError("Sorry No Data is available")
                removeLoader()
            });
    }

    const onRegSubmit = () => {
        setUserData("")
        serError("")
        showloader();
        let url = `${configs.regIDurl}/api/init-process`;
        
        axios.post(url, {
            regNumber: redId
          })
          .then(function (response) {
            console.log(response);
            removeLoader()
            setUserData(response.data);
          })
          .catch(function (error) {
            console.log(error);
            removeLoader();
            serError("Sorry No Data is available")
           
          });

        //hit submit API for Reg  Num
    }

    const renderInputPopup = () => {
        return (
            <div className='pad-20 upload'>
                <h2>Kindly Fill the Registration Number</h2>
                <div className='inputDiv'>
                    <input type="text" value={redId} onChange={(e) => setRegId(e.target.value)} />
                </div>
                <div className='df-jc'>
                    <div className='pad-10 mar-10'><Button btnText="Submit" color="red" click={onRegSubmit} /></div>
                    {/* <div className='pad-10 mar-10'><Button btnText="Close" color="red"  click={changePage} /></div> */}
                </div>
            </div>
        )
    }


    const renderRightBlock = () => {
        return (
            <div className='SearchBlock'>
                <div className='SearchBlock'>
                    <div className='upload'>
                        <p>Search by Registration ID</p>
                        <div className='inputDoc'>
                            <input
                                type="file"
                                accept={`.jpg, .jpeg, .png ${".pdf"}`}
                                id="reg_no"
                                disabled={false}
                                name="upload doc"
                                onChange={(e) => onChangeFile(e)} capture>
                            </input>
                        </div>
                    </div>

                    {renderInputPopup()}


                    {/* <div class="modal-content">
                  
                        <div className='pad-20'>
                            <h2>Please select a date range</h2>
                            <p>If you have checked yesterday then simply click on SUBMIT button</p>
                            <div className='date'>
                                <div className='dateLine'>From<input type="date" name="date_to" value={input.to} onChange={handleChange} /></div>
                                <div className='dateLine'>To<input type="date" name="date_from" value={input.from} onChange={handleChange} /></div>
                            </div>
                            <div className='df-jc'>
                                <div className='pad-10 mar-10'><Button btnText="Submit" color="red" click={hitSubmitAPI} /></div>
                                <div className='pad-10 mar-10'><Button btnText="Go to Home" color="red" click={gotoHome} /></div>
                            </div>
                            <div className='lastdata'>
                                <span>Last Fetched Date & Time : <strong>5/9/22</strong></span>
                                <span>Last updated : <strong>5/9/22</strong></span>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
        )
    }

    const renderUser = () => {
       

        let data = [
            { key: "Owner Name", value: userData.owner_name },
            { key: "Registration Number", value: userData.registration_number },
            { key: "Registration Date", value: userData.registration_date.slice(0,10 ) },
            { key: "Insurance Up-to", value: userData.insurance_upto.slice(0,10 ) },
        ]
        return (
            <div className='mainUser upload'>
                <h2>Details</h2>
                <div className='lower'>
                    {data.map((item, i) => (
                        <div className='lineUser'>
                            <span className='left'>{item.key}</span>
                            <span className='right'>{item.value}</span>
                        </div>
                    ))}
                </div>
                <div className='warning'>{userData.message}</div>
            </div>
        )
    }

    const renderUserPopup = () => {
        return (
            <div id="myModalUserdata" class="modal">
                <div class="modal-content modalInputMianDiv">
                        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
            </div>
        )
    }

    const renderLeftBlock = () => {
        return (
            <div className='leftinner  '>
                <div className='df-jc ai-c'>
                    Location <Dropdown items={cityList} />
                </div>
                <div>
                    <div>Total Vehicle <span>124359</span></div>
                    <div>Total Vehicle <span>98343</span></div>
                </div>
            </div>
        )
    }

    const renderTop = () => {
        return (
            <div className='df-jsb top'>
                {/* <div className='left'>{renderLeftBlock()}</div> */}
                <div className='right'>{renderRightBlock()}</div>
            </div>
        )
    }
    // const renderBottom = () => {
    //     return (
    //         <div>

    //         </div>
    //     )
    // }
    return (
        <div>
            <div>
                {renderTop()}
                {/* {renderBottom()} */}
                {renderUserPopup()}
                {userData && renderUser()}
                {error && <div className='warning center'>{error}</div>}
                <div className='pad-10 mar-10 center'><Button btnText="Back" color="red" closeColor={true} click={props.gotoHome} /></div>
            </div>
        </div>
    )
}

export default GetDetailPage