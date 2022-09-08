import React, { useState } from 'react'
import Button from './Button'
import configs from './configs'
import Dropdown from './Dropdown'
import axios from "axios"


const GetDetailPage = (props) => {
    const [input, setInput] = useState({ to: "", from: "" })

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

    const onChangeFile = (e) => {
        console.log(e)
        console.log(e.target.files);
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        let url = "";
        let key = "number_plate_image";
        let uploadData = new FormData();
        uploadData.append(key, e.target.files[0])
        // axios.post(url, uploadData, config)
        //     .then((res) => {
        //         console.log("SUCESS::::",res)
        //     }).catch((err) => {
        //         console.log("Error::::",err)
        //     })
        axios({
            method: "post",
            url: url,
            data: uploadData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }


    const renderRightBlock = () => {
        return (
            <div>
                <div className='SearchBlock'>
                    <div class="modal-content">
                        {/* <p>Some text in the Modal..</p> */}
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
                    </div>
                    <div className='upload'>
                        <h2>OR</h2>
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
                <div className='left'>{renderLeftBlock()}</div>
                <div className='right'>{renderRightBlock()}</div>
            </div>
        )
    }
    const renderBottom = () => {
        return (
            <div>

            </div>
        )
    }
    return (
        <div>
            <div>
                {renderTop()}
                {renderBottom()}
            </div>
        </div>
    )
}

export default GetDetailPage