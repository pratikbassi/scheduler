import React, { Fragment } from "react";
import classnames from "classnames";
import "../Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from './Status'
import Confirm from './Confirm'
import Error from './Error';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"
const DELETING = 'DELETING'
const CONFIRM = 'CONFIRM'
const EDIT = 'EDIT'
const ERROR_SAVE = 'ERROR_SAVE'
const ERROR_DELETE = 'ERROR_DELETE'

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => {transition(SHOW); console.log('called 1')})
    .catch(error => transition(ERROR_SAVE, true), console.log('called 2'))
  }
  function destroy(id) {
    transition(DELETING, true)
    props.onDelete(id)
    .then(() => {transition(EMPTY); console.log('called')})
    .catch(error => transition(ERROR_DELETE, true))
  }


  return (
    <article className="appointment" data-testid="appointment">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {transition(CONFIRM)}}
          onEdit={() => {transition(EDIT)}}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => {
            back();
          }}
          onSave={(name, interviewer) => save(name, interviewer)}
        />
      )}
      {mode === SAVING && (
        <Status message={'Saving!'} /> 
      )}{mode === DELETING && (
        <Status message={'Deleting!'}/> 
      )}
      {mode === CONFIRM && (
        <Confirm message='Delete Appointment?' onCancel={() =>  {back()}} onConfirm={() => {destroy(props.id)}}/>
      )}
      {mode === EDIT && (
        <Form 
          interviewers={props.interviewers}
          onCancel={() => {
            back();
          }}
          onSave={(name, interviewer) => {destroy(props.id); save(name, interviewer)}}
          interviewer={props.interview.interviewer.id}
          name={props.interview.student}
      />
      )} { mode === ERROR_SAVE && (
        <Error message={'Save Error! You will be redirected'} onClose={() => {back()}} />
      )}
      { mode === ERROR_DELETE && (
        <Error message={'Delete Error! You will be redirected'} onClose={() => {back()}} />
      )}
    </article>
  );
}
