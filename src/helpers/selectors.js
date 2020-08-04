export function getAppointmentsForDay(state, day) {
  const matchingDays = state.days.filter((elem) => {
    return elem.name === day;
  });

  if (matchingDays.length === 0) {
    return matchingDays;
  }

  return matchingDays[0].appointments.map((appt) => {
    return state.appointments[appt];
  });
}
