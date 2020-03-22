import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import axios from "axios";
import {
  getAppointmentsForDay,
  getInterviewersForDay
} from "helpers/selectors";
import useApplicationData from "../hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    Reload
  } = useApplicationData();

  Reload();

  const getInterview = function(curState, curInt) {
    if (curInt !== null) {
      return {
        student: curInt["student"],
        interviewer: curState["interviewers"][curInt["interviewer"]]
      };
    }

    return null;
  };

  let proctors = getInterviewersForDay(state, state.day);

  let appts = getAppointmentsForDay(state, state.day).map(item => {
    let data = getInterview(state, item.interview);

    return (
      <Appointment
        key={item.id}
        id={item.id}
        time={item.time}
        interview={data}
        interviewers={proctors}
        bookInterview={bookInterview}
        onDelete={cancelInterview}
      />
    );
  });
  if(appts.length > 0){
    appts.push(<Appointment key="last" time="5pm" />)
  }

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} setDay={setDay} day={state.day} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appts}
        
      </section>
    </main>
  );
}
