export function getAppointmentsForDay(state, day) {
  let rightDay = [];
  let returnList = [];


  for(let item of state.days) {

    if(item.name === day) {
      if(state.days.length === 0) {
        return rightDay
      }
      rightDay = item.appointments;

      for(let thing of rightDay) {
        returnList.push(state.appointments[thing])
      }
    }
  }
  return returnList
}


export function getInterviewersForDay(state, day) {
  let rightDay = [];
  let returnList = [];


  for(let item of state.days) {

    if(item.name === day) {
      if(state.days.length === 0) {
        return rightDay
      }
      rightDay = item.interviewers;

      for(let thing of rightDay) {
        returnList.push(state.interviewers[thing])
      }
    }
  }
  return returnList
}

export function getDay(state, day) {
  let date = null;
  for(let i = 0; i < state['days'].length;i++) {
    if (state['days'][i].name === day) {
      return i
    }
  }
  return date
}