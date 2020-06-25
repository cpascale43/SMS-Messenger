import React from "react";

import SMSForm from "./SMSForm";

const App = () => {
  const onClick = () => {
    fetch("/api/messages")
      .then((response) => response.json())
      .then((data) => console.log("YOUR MESSAGE DATA HERE: ", data.response));
  };

  return (
    <div className="container pt-5">
      <div className="row justify-content-center pt-5">
        <h1 className="p-5">SMS Messenger</h1>
      </div>
      <div className="row justify-content-end mr-3">
        <button
          type="button"
          onClick={onClick}
          className="btn btn-secondary btn-sm"
        >
          View all
        </button>
      </div>
      <SMSForm />
    </div>
  );
};

export default App;
