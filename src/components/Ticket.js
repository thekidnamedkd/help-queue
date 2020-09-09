import React from "react";
import PropTypes from "prop-types";

function Ticket(props){ // for each ticket its passing in individual properties for a single ticket creation


  return (
    <React.Fragment> 
      <div onClick={()=>props.whenTicketClicked(props.id)}>
        <h3>{props.location} - {props.names}</h3>                        
        <p><em>{props.issue}</em></p>
        <hr/>
      </div>
    </React.Fragment>
  ); //this react fragment tells you how it looks on the page
}

Ticket.propTypes = {
  names: PropTypes.string,
  location: PropTypes.string,
  issue: PropTypes.string,
  id: PropTypes.string, // 32 character alphanumeric Id with v4() so its a string not an int
  whenTicketClicked: PropTypes.func
};

export default Ticket;