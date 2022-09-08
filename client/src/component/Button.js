import React from 'react'

const Button = (props) => {



  return (
    <div className='wrapper'>
        <button className={`button-6 ${props.color} ${props.closeColor && "redBG"}`} name={props.name} onClick={(e)=>props.click(e)}>{props.btnText}</button>
    </div>
  )
}

export default Button