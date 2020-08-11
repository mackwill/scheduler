// Returns a list of all of the appointments for the selected day
export const getAppointmentsForDay = function (state, day) {
  const matchingDays = state.days.filter((elem) => {
    return elem.name === day;
  });

  if (matchingDays.length === 0) {
    return matchingDays;
  }

  const newAppts = matchingDays[0].appointments.map((appt) => {
    return state.appointments[appt];
  });

  return newAppts;
};

// Get and return the information from the selected interview
export const getInterview = (state, interview) => {
  if (interview === null) {
    return null;
  }

  const { interviewers } = state;

  return {
    student: interview.student,
    interviewer: interviewers[interview.interviewer],
  };
};

// Returns a list of all of the interviews booked on the selected day
export const getInterviewersForDay = function (state, day) {
  const matchingDays = state.days.filter((elem) => {
    return elem.name === day;
  });

  if (matchingDays.length === 0) {
    return matchingDays;
  }

  const interviewerList = matchingDays[0].interviewers.map((elem) => {
    return state.interviewers[elem];
  });

  return interviewerList;
};

// Returns the day object of the selected day
export const findDayByName = (days, day) => {
  const dayObj = days.filter((elem) => {
    return elem.name === day;
  });
  return dayObj;
};

// Takes in the udpdated day object and returns the updated days array
export const updateDaysArray = (days, day, newDay) => {
  const newDaysArr = days.map((elem) => {
    if (elem.name === day) {
      return newDay;
    }
    return elem;
  });
  return newDaysArr;
};

// Counts and returns the number of appointments that are not null (number of open spots)
export const checkSpots = (currentDayAppts, appointments) => {
  const takenSpots = currentDayAppts.filter((elem) => {
    return appointments[elem].interview !== null;
  });
  return takenSpots.length;
};
