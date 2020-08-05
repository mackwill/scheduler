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

  // Function to create a new interview
  const bookInterview = (id, interview) => {
    // Create the appointment object
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    // Add appointment object to appointments object
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      setState((prev) => ({
        ...prev,
        appointments,
      }));
    });
  };

  // Function to cancel an interview
  const cancelInterview = (id) => {
    // Get the current appointment and set the interview to null
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    // Update the appointments array with the new appointment
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      setState((prev) => ({
        ...prev,
        appointments,
      }));
    });
  };

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
