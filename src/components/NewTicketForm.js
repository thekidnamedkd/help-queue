import React from "react";
import { v4 } from 'uuid';
import PropTypes from "prop-types";
import ReusableForm from './ReusableForm';


function NewTicketForm(props){ // function created, defined below as version that is passed into ticket control render

  function handleNewTicketFormSubmission(event) { //gathers input from user
    event.preventDefault();
    props.onNewTicketCreation({names: event.target.names.value, location: event.target.location.value, issue: event.target.issue.value, id: v4()}); // v4 is the UUID that assigns an id to each ticket object
    // onNewTicketCreation is the callback that allows the parent to access the inputs from the form. And pass it to the the 
    // handleAddingNewTicketToList to be added to the masterlist 
  }

  return (
    <React.Fragment>
      <ReusableForm
      formSubmissionHandler={handleNewTicketFormSubmission}
      buttonText="Help!"
      />
    </React.Fragment>
  );
}

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func // passed into the conditional rendering in ticketcontrol
};

export default NewTicketForm;