import React, { useState } from "react";
import "./SMSForm.css";

const SMSForm = () => {
  const [message, setMessage] = useState({ to: "", body: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);
    fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setError(false);
          setSubmitting(false);
          setMessage({ to: "", body: "" });
        } else {
          setError(true);
          setSubmitting(false);
        }
      });
  };

  const onHandleChange = (event) => {
    const name = event.target.getAttribute("name");
    setMessage({ ...message, [name]: event.target.value });
  };

  return (
      <form
        onSubmit={onSubmit}
        className={error ? "error sms-form" : "sms-form"}
      >
        <div className="form-group">
          <label htmlFor="to">Recipient number:</label>
          <input
            type="tel"
            name="to"
            id="to"
            value={message.to}
            onChange={onHandleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Message:</label>
          <textarea
            name="body"
            id="body"
            value={message.body}
            onChange={onHandleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          Send message
        </button>
      </form>
  );
};

export default SMSForm;
