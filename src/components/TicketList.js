import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";


function TicketList(props){       // in this case, props = masterTicketList(from TicketControl.js) which is: [{ticket}, {ticket}, {ticket}] an array of individual ticket objects
  return (
    <React.Fragment>
      <hr/>
      {props.ticketList.map((ticket) => // maps each ticket and assigns their input values to be displayed as a list
        <Ticket 
          whenTicketClicked = {props.onTicketSelection}
          names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          id={ticket.id}
          key={ticket.id}/>
      )}
    </React.Fragment>
  );
}

TicketList.propTypes = {
  ticketList: PropTypes.array,
  onTicketSelection: PropTypes.func
};

export default TicketList;