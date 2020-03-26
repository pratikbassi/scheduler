import React from "react";
import Button from '../Button';

export default function confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm" data-testid="confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}>Cancel</Button>
        <Button danger onClick={props.onConfirm}>Confirm</Button>
      </section>
    </main>
  );
}
