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

export const findDayByName = (days, day) => {
  const dayObj = days.filter((elem) => {
    return elem.name === day;
  });
  return dayObj;
};

export const updateDaysArray = (days, day, newDay) => {
  const newDaysArr = days.map((elem) => {
    if (elem.name === day) {
      return newDay;
    }
    return elem;
  });
  return newDaysArr;
};

export const checkSpots = (currentDayAppts, appointments) => {
  const takenSpots = currentDayAppts.filter((elem) => {
    return appointments[elem].interview !== null;
  });
  return takenSpots.length;
};
