import React from "react";
import useVisualMode from "hooks/useVisualMode";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";

export default function Index(props) {
  console.log("props: ", props);
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    Promise.resolve(props.bookInterview(props.id, interview)).then((res) => {
      transition(SHOW);
    });
  };

  // Take in the current appointment ID and pass it to cancelInterview
  // then transition to the empty mode
  const deleteAppt = () => {
    transition(DELETING);
    Promise.resolve(props.cancelInterview(props.id)).then(() => {
      transition(EMPTY);
    });
  };

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={(e) => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={deleteAppt}
        />
      )}
      {mode === CREATE && (
        <Form onSave={save} onCancel={back} interviewers={props.interviewers} />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
    </article>
  );
}
