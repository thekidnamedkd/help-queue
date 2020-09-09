import React from "react";
import PropTypes from "prop-types";

function Ticket(props){ // for each ticket its passing in individual properties for a single ticket creation
  return (
    <React.Fragment> 
      <h3>{props.location} - {props.names}</h3>                        
      <p><em>{props.issue}</em></p>
      <hr/>
    </React.Fragment>
  ); //this react fragment tells you how it looks on the page
}

Ticket.propTypes = {
  names: PropTypes.string,
  location: PropTypes.string,
  issue: PropTypes.string
};

export default Ticket;