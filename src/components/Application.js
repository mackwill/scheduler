import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointments from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  {
    id: 3,
    time: "11am",
    interview: {
      student: "Jon Snow",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      },
    },
  },
  {
    id: 4,
    time: "2pm",
  },
];

export default function Application(props) {
  // Set the state to default to Monday
  const [currentDay, setDay] = useState("Monday");
  const [days, setDays] = useState([]);

  // Request to /api/days and update the state of days using the
  // data from the axios get request
  useEffect(() => {
    axios.get("/api/days").then((res) => {
      setDays(res.data);
    });
  }, []); //An empty array is passed as a dependancy to avoid an infinite loop of the request beign made since there is no real dependancy

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
          <DayList days={days} day={currentDay} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="../images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map((appt) => {
          return <Appointments key={appt.id} {...appt} />;
        })}
        <Appointments key="last" time={"5pm"} />
      </section>
    </main>
  );
}
