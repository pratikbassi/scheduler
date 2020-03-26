import React from "react";
import 'components/DayListItem.scss';
import classnames from 'classnames'



export default function DayListItem(props) {
  let isFull = false
  if (!props.spots||props.spots === 0) {
    isFull = true;
  }


  const formatSpots = function(spots){
    if(spots === 0){
      return 'no spots remaining'
    } else if (spots > 1) {
      return `${spots} spots remaining`
    } else if (spots === 1) {
      return '1 spot remaining'
    }
  }



  let dayClass = classnames(
    'day-list__item',{
    'day-list__item--selected':props.selected,
    'day-list__item--full':isFull
})


  return (
    <li 
    onClick={() => props.setDay(props.name)}
    className={dayClass}
    data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}