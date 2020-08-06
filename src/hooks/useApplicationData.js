import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { findDayByName, updateDaysArray } from "helpers/selectors";

export default function useApplicationData() {
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {},
  //   spots: 0,
  // });

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const reducer = (state, action) => {
    switch (action.type) {
      case SET_DAY: {
        return { ...state, day: action.value };
      }
      case SET_APPLICATION_DATA: {
        return { ...state, ...action.value };
      }
      case SET_INTERVIEW: {
        console.log("action-value", action.value);
        return { ...state, ...action.value };
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    spots: 0,
  });

  // Set the state for the day and days
  // const setDay = (day) => setState({ ...state, day });
  const setDay = (day) => dispatch({ type: SET_DAY, value: day });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
    ]).then((all) => {
      // setState((prev) => ({
      //   ...prev,
      //   days: all[0].data,
      //   appointments: all[1].data,
      //   interviewers: all[2].data,
      //   spots: findDayByName(all[0].data, state.day)[0].spots,
      // }));
      dispatch({
        type: SET_APPLICATION_DATA,
        value: {
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
          spots: findDayByName(all[0].data, state.day)[0].spots,
        },
      });
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

    // Get the current day object
    const currentDay = findDayByName(state.days, state.day)[0];

    // Update the spots key in the array
    const day = {
      ...currentDay,
      spots: (state.spots -= 1),
    };

    // Update the days array with the new day object
    const days = updateDaysArray(state.days, state.day, day);

    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      // setState((prev) => ({
      //   ...prev,
      //   appointments,
      //   days,
      // }));
      dispatch({
        type: SET_INTERVIEW,
        value: {
          appointments,
          days,
        },
      });
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

    // Get the current day object
    const currentDay = findDayByName(state.days, state.day)[0];

    // Update the spots key in the array
    const day = {
      ...currentDay,
      spots: (state.spots += 1),
    };

    // Update the days array with the new day object
    const days = updateDaysArray(state.days, state.day, day);

    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      // setState((prev) => ({
      //   ...prev,
      //   appointments,
      //   days,
      // }));
      dispatch({
        type: SET_INTERVIEW,
        value: {
          appointments,
          days,
        },
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
