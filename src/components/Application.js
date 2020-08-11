import React from "react";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

import "components/Application.scss";
import DayList from "./DayList";
import Appointments from "components/Appointment";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();

  // Gets all of the appointments for the selected day, all of the booked interviews
  // for the selected day, and then renders the Appointment components accordingly
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
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
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
