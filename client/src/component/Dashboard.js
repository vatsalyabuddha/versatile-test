import React from 'react'
import Box from './Box'

const Dashboard = () => {

    const renderTop = () => {
        return (
            <div>renderTop</div>
        )
    }

    const renderMiddle = () => {
        let tileData = [
            { label: "Vehicles", number: 100 },
            { label: "Unique Vehicles", number: 100 },
            { label: "Insured", number: 100 },
            { label: "Uninsured", number: 100 },
            { label: "Vehicle Category", number: 100 },
            { label: "Location", number: 100 },
        ]
        return (
            <div className='Dashboardmiddle'>
                <div className='box-con'>{tileData.map((item, i) => <Box label={item.label} id={item.label} number={item.number} />)}
                </div>
            </div>
        )
    }
    const getMonth=(num)=>{
        switch(num){
            case 0: return "Jan";
            case 1: return "Feb";
            case 2: return "Mar";
            case 3: return "Apr";
            case 4: return "May";
            case 5: return "Jun";
            case 6: return "Jul";
            case 7: return "Aug";
            case 8: return "Sep";
            case 9: return "Oct";
            case 10: return "Nov";
            case 11: return "Dec";
            default: return "Aug"

        }
    }
    const renderBottom = () => {

        let tileData = [
            { label: "Jan", number: 100 },
            { label: "Feb", number: 100 },
            { label: "Mar", number: 100 },
            { label: "Apr", number: 100 },
            { label: "May", number: 100 },
            { label: "Jun", number: 100 },
            { label: "Jul", number: 100 },
            { label: "Aug", number: 100 },
            { label: "Sep", number: 100 },
            { label: "Oct", number: 100 },
            { label: "Nov", number: 100 },
            { label: "Dec", number: 100 },
          
        ]

        let date = new Date();
        console.log(date.getMonth());
        let month = getMonth(date.getMonth())
        return (
            <div className='bottom'>
                <div className='df-jc head'><h2>Expiry Data </h2><span>Last updated : 5/9/22</span></div>
                
                
                <div className='Dashboardmiddle'>
                    <div className='box-con'>{tileData.map((item, i) => i<6 && <Box label={item.label} id={item.label} number={item.number} color="green" red={item.label === month} />)}</div>
                    <div className='box-con'>{tileData.map((item, i) => i>5 && <Box label={item.label} id={item.label} number={item.number} color="green" red={item.label === month} />)}</div>
                </div>


            </div>
        )
    }


    return (
        <div>
            <h2>Dashboard</h2>
            {renderTop()}
            {renderMiddle()}
            {renderBottom()}
        </div>
    )
}

export default Dashboard