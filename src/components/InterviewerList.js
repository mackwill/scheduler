import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from "prop-types";

import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light"></h4>
      <ul className="interviewers__list">
        {props.interviewers.map((interviewer) => {
          return (
            <InterviewerListItem
              key={interviewer.id}
              selected={interviewer.id === props.value}
              name={interviewer.name}
              avatar={interviewer.avatar}
              onChange={(e) => props.onChange(interviewer.id)}
            />
          );
        })}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};
