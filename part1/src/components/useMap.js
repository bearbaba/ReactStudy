import React from 'react';
const UseMap = (props) => {
  return ( 
    <ul> 
      {
        props.lists.map((list) =>
          <li key = {list.id}> {list.content} </li>)
      } 
    </ul>  
  )
}

export default UseMap;