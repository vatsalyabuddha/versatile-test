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

    const renderBottom = () => {

        let tileData = [
            { label: "Vehicles", number: 100 },
            { label: "Unique Vehicles", number: 100 },
            { label: "Insured", number: 100 },
            { label: "Uninsured", number: 100 },
            { label: "Vehicle Category", number: 100 },
            { label: "Location", number: 100 },
        ]
        return (
            <div>
                <h2>Expiry Data <span>Last updated : 5/9/22</span></h2>
                <div className='Dashboardmiddle'>
                    <div className='box-con'>{tileData.map((item, i) => <Box label={item.label} id={item.label} number={item.number} />)}</div>
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