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

  const { days, appointments, interviewers } = state;

  return {
    student: interview.student,
    interviewer: interviewers[interview.interviewer],
  };
};
