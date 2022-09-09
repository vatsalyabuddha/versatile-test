import React, { useState } from 'react'
import Button from './Button'
import "../app.css"
import GetDetailPage from './GetDetailPage'
import Dashboard from './Dashboard'
import Database from './Database'

const Home = () => {

    const [loader, setLoader] = useState(false)
    const [isReg, setReg] = useState(false)
    const [redId, setRegId] = useState("");
    const [isHome, setHome] = useState(true);
    const [tab, setTab] = useState("")
    // const [input, setInput] = useState({ to: "", from: "" })

    const data = [
        { key: "Vehicles Observed", value: "₹20000" },
        { key: "Vehicles Observed", value: "₹20000" },
        { key: "Vehicles Observed", value: "₹20000" },
        { key: "Vehicles Observed", value: "₹20000" },
    ]

    const renderPage =()=>{
        switch(tab){
            case "getRegNumData" : return <GetDetailPage gotoHome={gotoHome} />;
            case "dashboard" : return <Dashboard gotoHome={gotoHome} />;
            case "database" : return <Database gotoHome={gotoHome} />;
            case "expData" : return <GetDetailPage gotoHome={gotoHome} />;
            default: break;
        }
    }

    const renderData = () => {
        return (
            <div class="right insurDirectDetail">
                <div class="card ">
                    <div class="mainContainer">
                        <div class="bold pad-10">Vehicles Observed</div>
                        <div className='line'></div>
                        {data.map((item, i) => (
                            <div className='homeContentmain pad-B5'>
                                <div class="mainLeft">{item.key}</div>
                                <div class="mainRight bold">{item.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    const getRegNumData = () => {
        // var modal = document.getElementById("myModal");
        // modal.style.display = "block";
        // setLoader(true)

        setHome(false);
    }

    const sendRegNum = () => {
        var modal = document.getElementById("myModalInput");
        modal.style.display = "block";
        // setReg(true)
        //send Reg Num API
    }
    const changePage = (e) => {
        let name = e.target.name
        setTab(name)
        setHome(false)
    }
    const renderHome = () => {
        return (
            <div className='home'>
                {/* {renderData()} */}
                <h2 className='nav-head-main'> Insurance Verification Portal</h2>
                {/* <h2> OR</h2>
                <h2> Go To DashBoard</h2> */}
                <div className='df-jc'>
                    <div className='pad-10 mar-10'><Button btnText="Find Uninsured Vehicle" color="red" name="getRegNumData" click={changePage} /></div>
                    <div className='pad-10 mar-10'><Button btnText="Dashboard Data" color="red" name="dashboard" click={(e)=>changePage(e)} /></div>
                </div>
                <div className='df-jc'>
                    <div className='pad-10 mar-10'><Button btnText="Data Filters" color="red" name="database" click={(e)=>changePage(e)} /></div>
                    {/* <div className='pad-10 mar-10'><Button btnText="Expiry Data" color="red" name="expData" click={(e)=>changePage(e)} /></div> */}
                </div>
            </div>
        )
    }

    // const renderListPage = () => {
    //     return (
    //         <div>

    //             {renderSearchBlock()}
    //         </div>
    //     )

    // }
    // const handleChange = (e) => {
    //     let name = e.target.name;
    //     switch (name) {
    //         case "date_to": setInput(prev => ({ ...prev, to: e.target.value })); break;
    //         case "date_from": setInput(prev => ({ ...prev, from: e.target.value })); break;
    //         default: return
    //     }
    // }

    const gotoHome = () => setHome(true)



    // const renderLoader = () => {
    //     return (
    //         <div id="myModal" class="modal">
    //             <div class="modal-content">
    //                 {/* <span class="close">&times;</span> */}
    //                 {/* <p>Some text in the Modal..</p> */}
    //                 <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    //             </div>
    //         </div>
    //     )
    // }


    // const closeInputPopup = () => {
    //     var modal = document.getElementById("myModalInput");
    //     modal.style.display = "none";
    //     // setReg(false)
    // }


    // const setInput =(e)=>{

    //     setRegId(e.target.value.toUpperCase())
    // }
    // const renderInputPopup = () => {
    //     return (
    //         <div id="myModalInput" class="modal">
    //             <div class="modal-content modalInputMianDiv">
    //                 {/* <p>Some text in the Modal..</p> */}
    //                 <div className='pad-20'>
    //                     <h2>Kindly Fill the Registration Number</h2>
    //                     <div className='inputDiv'>
    //                         <input type="text" value={redId} onChange={(e) => setInput(e)} />
    //                     </div>
    //                     <div className='df-jc'>
    //                         <div className='pad-10 mar-10'><Button btnText="Submit" color="red" click={hitSubmitAPI} /></div>
    //                         <div className='pad-10 mar-10'><Button btnText="Close" color="red" click={closeInputPopup} /></div>
    //                     </div>
    //                 </div>
    //                 {/* <span class="" onClick={()=> setReg(false)}>Close</span> */}
    //             </div>
    //         </div>
    //     )
    // }



    return (
        <div>
            {/* {renderLoader()} */}
            {/* {renderInputPopup()} */}
            {isHome ? renderHome() : renderPage()}
            {/* {isHome ? renderHome() : <GetDetailPage gotoHome={gotoHome}/>} */}
        </div>
    )
}

export default Home