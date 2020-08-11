# Interview Scheduler

The interview scheduler is an app created using the React framework that allows a user to book, edit and delete an interview.
An interview can be booked on a selected day of the week (Monday through Friday), for a selected time slot, and with a selected interviewer.
The side menu bar advises users how many open spots are remaining for each of the days of the week.

### Final Product

!["Screenshot of appointments page"](https://github.com/mackwill/scheduler/blob/master/docs/appointments_view.png)
!["Screenshot of creating appointment"](https://github.com/mackwill/scheduler/blob/master/docs/book_appointment.png)
!["Screenshot of delete appointment"](https://github.com/mackwill/scheduler/blob/master/docs/delete_appointment.png)
!["Screenshot of mobile mode"](https://github.com/mackwill/scheduler/blob/master/docs/mobile.png)

## Dependencies

- axios: 0.19.2,
- classnames: 2.2.6,
- heroku: 7.42.6,
- node-sass: 4.14.1,
- normalize.css: 8.0.1,
- react: 16.9.0,
- react-dom: 16.9.0,
- react-hooks-testing-library: 0.6.0,
- react-scripts: 3.0.0,
- react-test-renderer: 16.13.1,
- sass: 1.26.10

## Getting Started

- Install all dependencies using `npm install` command
- Clone the scheduler-api from https://github.com/lighthouse-labs/scheduler-api and run the development server from the scheduler-api root folder using `npm start`
- On a separate terminal, run development build using `npm start` from project root folder

## Current Functionality

- Users can book, edit and delete appointments
- Error handling to require users to input name/select an interviewer when booking an appointment
- Status indicator to show that the request is in the process of being made (Saving, Deleting)
- Pipeline management using CircleCI
- Production deployment using Netlify: https://kind-hypatia-ff41b6.netlify.app/

## Further Development

- Expand scope of the appointments to entire calendar year
  - Ability to select specific week of the year, side menu bar reflects the actual day numbers
- User authenticaion features
