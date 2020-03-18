import React from "react";
//import classnames from 'classnames'
import DayListItem from 'components/DayListItem';


export default function DayList(props) {
  const returnArray = props.days.map((day) => {
    return (<DayListItem 
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.day}
      setDay={props.setDay}  />)
  })

  return (<ul>{returnArray}</ul>)
}