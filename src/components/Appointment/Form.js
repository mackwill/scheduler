import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [interviewer, setInterviewer] = useState(props.value || null);
  const [name, setName] = useState(props.student || "");
  const [error, setError] = useState("");

  const reset = () => {
    setInterviewer(null);
    setName("");
  };

  const cancel = () => {
    props.onCancel();
    reset();
  };

  const validate = () => {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    } else if (!interviewer) {
      setError("Interviewer must be chosen");
      return;
    }
    props.onSave(name, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
          <p>Interviewer</p>
          <InterviewerList
            interviewers={props.interviewers}
            value={interviewer}
            onChange={(e) => setInterviewer(e)}
            selected={interviewer}
          />
        </form>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button onClick={validate} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
