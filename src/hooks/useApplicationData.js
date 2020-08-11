import { useEffect, useReducer } from "react";
import axios from "axios";
import { findDayByName, updateDaysArray, checkSpots } from "helpers/selectors";
// import axios from "__mock__/axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

// Personal note, put the data manipulation within the actions here because the benefit of
// using the reducer is that its always guarenteed to receive the latest state
const reducer = (state, action) => {
  switch (action.type) {
    case SET_DAY: {
      return { ...state, day: action.value };
    }
    case SET_APPLICATION_DATA: {
      return { ...state, ...action.value };
    }
    case SET_INTERVIEW: {
      const { interview, id } = action.value;

      const appointment = {
        ...state.appointments[id],
        interview: interview ? { ...interview } : null,
      };

      // Add appointment object to appointments object
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };

      // Get the current day object
      const currentDay = findDayByName(state.days, state.day)[0];

      // Check for edit on Appointment

      const takenSpots = checkSpots(currentDay.appointments, appointments);
      const remainingSpots = currentDay.appointments.length - takenSpots;

      // Update the spots key in the array
      const day = {
        ...currentDay,
        spots: remainingSpots,
      };

      // Update the days array with the new day object
      const days = updateDaysArray(state.days, state.day, day);

      return { ...state, appointments, days };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    spots: 0,
  });

  // Set the state for the day and days
  const setDay = (day) => dispatch({ type: SET_DAY, value: day });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
    ]).then((all) => {
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
  }); //An empty array is passed as a dependancy to avoid an infinite loop of the request beign made since there is no real dependancy

  useEffect(() => {
    const webSocket = new WebSocket("ws://localhost:8001/");

    webSocket.onopen = (e) => {
      webSocket.send("ping");
    };

    webSocket.onmessage = (e) => {
      const response = JSON.parse(e.data);
      console.log("response", response);

      if (response.type === SET_INTERVIEW) {
        console.log("this set interview worked");
        dispatch({
          type: SET_INTERVIEW,
          value: {
            interview: response.interview,
            id: response.id,
          },
        });
      }
    };
  }, []);
  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      //   console.log("res: ", res);
      if (!interview.student || !interview.interviewer) {
        throw new Error();
      }
    });
  };

  // Function to cancel an interview
  const cancelInterview = (id, interview = null) => {
    return axios.delete(`/api/appointments/${id}`, { interview });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
