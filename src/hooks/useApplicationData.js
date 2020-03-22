import React, { useState, useEffect } from "react";
import "components/Application.scss";
import axios from "axios";
import {getDay} from '../helpers/selectors';

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: null
  });

  function Reload() {
    useEffect(() => {
      const promise1 = axios.get("/api/days");
      const promise2 = axios.get("/api/appointments");
      const promise3 = axios.get("/api/interviewers");

      Promise.all([promise1, promise2, promise3]).then(all => {
        console.log(all[0].data)
        setState(prev => ({
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));
      });
    }, []);
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    let dayUpdate = getDay(state, state.day)

    //const days = [...state.days]
      
    
    
    //console.log({student: interview.student, interviewer:interview.interviewer},'second')
    let axPromise = axios
      .put(`/api/appointments/${Number(id)}`, { interview: interview })
      .then(setState({ ...state, appointments }))
      .then(state.days[dayUpdate].spots -= 1)
      .catch(err => err);

    return axPromise;
  }

  function cancelInterview(id) {
    let appointments = {
      ...state.appointments
    };
    appointments[id].interview = null;

    let dayUpdate = getDay(state, state.day)

    let axPromise = axios
      .delete(`/api/appointments/${id}`)
      .then(setState({ ...state, appointments }))
      .then(state.days[dayUpdate].spots += 1)
      .catch(err => err);

    return axPromise;
  }

  function setDay(date) {
    setState({...state, day:date})
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    Reload
  };
}
