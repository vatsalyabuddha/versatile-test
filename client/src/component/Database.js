import axios from 'axios';
import React, { useEffect, useState } from 'react';
import configs from './configs';
import Table from './Table';
import data from "./list.json"
import Button from './Button';



const Database = (props) => {
    let [data, setData] = useState([]);
    const [input, setInput] = useState({ to: "", from: "" })



    useEffect(() => {
        let url = `${configs.regIDurl}/api/total-reg-checked`;

        axios.get(url)
            .then(function (response) {
                console.log(response);
                setData(response.data);
            })
            .catch(function (error) {
                console.log(error);
                // serError("Sorry No Data is available")

            });

    }, [])

    const handleChange = (e) => {
        let name = e.target.name;
        switch (name) {
            case "date_to": setInput(prev => ({ ...prev, to: e.target.value })); break;
            case "date_from": setInput(prev => ({ ...prev, from: e.target.value })); break;
            default: return
        }
    }
    // const closeInputPopup = () => {
    //     var modal = document.getElementById("myModalInput");
    //     modal.style.display = "none";
    //     // setReg(false)
    // }

    const submit = () => {

    }

    const renderTop = () => {
        return (
            <div>
                <div class="modal-content center">

                    <div className='pad-20'>
                        <h2>Please select a date range</h2>
                        <p>If you have checked yesterday then simply click on SUBMIT button</p>
                        <div className='date df-jc'>
                            <div className='dateLine'>From<input type="date" name="date_to" value={input.to} onChange={handleChange} /></div>
                            <div className='dateLine'>To<input type="date" name="date_from" value={input.from} onChange={handleChange} /></div>
                        </div>
                        <div className='df-jc'>
                            <div className='pad-10 mar-10'><Button btnText="Submit" color="red" click={submit} /></div>
                            <div className='pad-10 mar-10 center'><Button btnText="Back" color="red" closeColor={true} click={props.gotoHome} /></div>

                            {/* <div className='pad-10 mar-10'><Button btnText="Go to Home" color="red" click={gotoHome} /></div> */}
                        </div>
                        {/* <div className='lastdata'>
                            <span>Last Fetched Date & Time : <strong>5/9/22</strong></span>
                            <span>Last updated : <strong>5/9/22</strong></span>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }



    const renderBottom = () => {
        return (
            <div>
                <Table data={data} />
            </div>
        )
    }




    return (
        <div>
            {renderTop()}
            {renderBottom()}
        </div>
    )
}

export default Database