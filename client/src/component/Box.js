import React from 'react'

const Box = (props) => {



    return (
        <div className='mainBox'>
            <div className='tileBox'>
                <div><strong>{props.label}</strong></div>
                <div className={`box ${props.color && props.color } ${props.red && "redBG" }`}>{props.number}</div>
            </div>
        </div>
    )
}

export default Box