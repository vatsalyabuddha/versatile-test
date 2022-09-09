import React from 'react'

const Table = (props) => {


    const data = props.data;

    const getStatus=(status)=>{
        switch(status){
            case -1: return "UnInsured"; 
            case 1: return "Insured"; 
            default: return "Insured"; 
        }
    }

    

  return (
    <div>
        <table id="customers">
  <tr>
    <th>Reg Number</th>
    <th>Captured Date</th>
    <th>Location</th>
    <th>Insurance Status</th>
    <th>Insurance Exp. Date</th>
  </tr>
  {data.map((item, i)=>{
    return(
        <tr>
    <td>{item.registration_number}</td>
    <td>{item.created_date && item.created_date.slice(0, 10)}</td>
    <td>{item.rto_city_name}</td>
    <td className={`${getStatus(item.insurance_status)==="UnInsured" && "red"}`}>{getStatus(item.insurance_status)}</td>
    <td>{item.insurance_upto && item.insurance_upto.slice(0, 10)}</td>
  </tr>
    )
  })}
  
</table>
    </div>
  )
}

export default Table