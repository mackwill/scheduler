import React from "react";
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
  console.log("props: ", props.interview);
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

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
        console.log("here");
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

  // Edit currently selected appointment
  const edit = () => {
    transition(EDIT);
  };

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={(e) => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={edit}
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
