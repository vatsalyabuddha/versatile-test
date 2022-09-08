import React from 'react'

const Dropdown = (props) => {
  return (
    <div>
      <nav>
        <ul>
          <li class="Lev-1">
            <a href="">Level-1</a>
            <ul>
              {props.items && props.items.map(item => <li><a href="">{item}</a></li>)}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Dropdown