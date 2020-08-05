import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

import "components/Application.scss";
import DayList from "./DayList";
import Appointments from "components/Appointment";

const appointments = [
  // {
  //   id: 1,
  //   time: "12pm",
  // },
  // {
  //   id: 2,
  //   time: "1pm",
  //   interview: {
  //     student: "Lydia Miller-Jones",
  //     interviewer: {
  //       id: 1,
  //       name: "Sylvia Palmer",
  //       avatar: "https://i.imgur.com/LpaY82x.png",
  //     },
  //   },
  // },
  // {
  //   id: 3,
  //   time: "11am",
  //   interview: {
  //     student: "Jon Snow",
  //     interviewer: {
  //       id: 2,
  //       name: "Tori Malcolm",
  //       avatar: "https://i.imgur.com/Nmx0Qxo.png",
  //     },
  //   },
  // },
  // {
  //   id: 4,
  //   time: "2pm",
  // },
];

export default function Application(props) {
  // Set the state to default to Monday
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // Set the state for the day and days
  const setDay = (day) => setState({ ...state, day });

  // Request to /api/days and update the state of days using the
  // data from the axios get request
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []); //An empty array is passed as a dependancy to avoid an infinite loop of the request beign made since there is no real dependancy

  const newAppts = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      const interview = getInterview(state, appointment.interview);
      const interviewersForDay = getInterviewersForDay(state, state.day);
      return (
        <Appointments
          key={appointment.id}
          {...appointment}
          interview={interview}
          interviewers={interviewersForDay}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="../images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="../images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {newAppts}
        <Appointments key="last" time={"5pm"} />
      </section>
    </main>
  );
}
