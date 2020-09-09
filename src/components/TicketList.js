import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";


function TicketList(props){       // in this case, props = masterTicketList(from TicketControl.js) which is: [{ticket}, {ticket}, {ticket}] an array of individual ticket objects
  return (
    <React.Fragment>
      <hr/>
      {props.ticketList.map((ticket, index) => // maps each ticket and assigns their values to be displayed as a list
        <Ticket names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          key={index}/>
      )}
    </React.Fragment>
  );
}

TicketList.propTypes = {
  ticketList: PropTypes.array
};

export default TicketList;