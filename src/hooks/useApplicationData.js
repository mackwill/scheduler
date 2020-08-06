import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // Set the state for the day and days
  const setDay = (day) => setState({ ...state, day });

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

  return { state, setDay, bookInterview, cancelInterview };
}
