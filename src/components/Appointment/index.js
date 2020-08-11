import React, { useEffect } from "react";
import useVisualMode from "hooks/useVisualMode";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Index(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // For use with web sockets, transitions to show or empty  if the state  of the interview/transition or mode has changed
  useEffect(() => {
    if (mode === EMPTY && props.interview) {
      transition(SHOW);
    }
    if (mode === SHOW && !props.interview) {
      transition(EMPTY);
    }
  }, [props.interview, mode, transition]);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then((res) => transition(SHOW))
      .catch((err) => {
        // True needs to be passed to transition here because an error has been encountered
        // and the previous mode state of 'saving' needs to be deleted for the user to be
        // able to go back to the form
        transition(ERROR_SAVE, true);
      });
  };

  // Take in the current appointment ID and pass it to cancelInterview
  // then transition to the empty mode
  const deleteAppt = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((err) => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {/* Check the current mode that the appointment is in and transition accordingly */}
      {mode === EMPTY && <Empty onAdd={(e) => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form onSave={save} onCancel={back} interviewers={props.interviewers} />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={deleteAppt}
          onCancel={back}
          message={"Are you sure you want to delete?"}
        />
      )}
      {mode === EDIT && (
        <Form
          onSave={save}
          onCancel={back}
          value={props.interview.interviewer.id}
          student={props.interview.student}
          interviewers={props.interviewers}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error message="Please try again" onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="There was an error deleting your appointment. Please try again"
          onClose={back}
        />
      )}
    </article>
  );
}
