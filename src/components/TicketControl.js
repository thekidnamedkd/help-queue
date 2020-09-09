
import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,   // by default: newTicketForm = hidden, TicketList = show
      masterTicketList: [] // instantiate empty array to be populated with ticket objects                           
    };
  }

  handleClick = () => {
    this.setState(prevState => ({
      formVisibleOnPage: !prevState.formVisibleOnPage, // prevState is actually current state so this just changes from false to true depending on what current state the page is on
    }));                           //if you can see the form, you can see the button
  }


  // funtion below adds new ticket entries to the master list of tickets, but it needs access to the form so it is passed to NewTicketForm in the render
  handleAddingNewTicketToList = (newTicket) => { // Method for adding new ticket to master list, the parameter "newTicket" comes from ticketForm.js with all the new ticket properties (form data). This method will be saved as the onNewTicketCreation property on NewTicketForm.
    const newMasterTicketList = this.state.masterTicketList.concat(newTicket); // returns brand new array and adds new ticket element saves it in new master ticket list
    this.setState({
      masterTicketList: newMasterTicketList, //then we are setting set current state to mastertickelist, this is just like the stuff we did in week one with the plant factory!
      formVisibleOnPage: false });
  }

  render(){
    let currentlyVisibleState = null; // create a null variable that can be used in conditional to determine which state is visible
    let buttonText = null; // create null button variable that can be used fo conditional
    if (this.state.formVisibleOnPage) { // if the form is visible
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} /> // this is where we pass child to parent, on is often used for props and this is passed into NewTickeForm (other file)
      buttonText = "Return to Ticket List"; // and show return to ticket list text on button
    } else {                                    // otherwise
      currentlyVisibleState = <TicketList ticketList={this.state.masterTicketList} />; // pass masterlist to the ticketlist component and also show the ticket list
      buttonText = "Add Ticket"; // and show this add ticket button
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button> 
      </React.Fragment> //return whichever state is visible and the button with whichever text is visibleState
    );
  }

}

export default TicketControl;

// state is fluid and everchanging, props never change and component cannot change its props
// Ticket control has local state with the toggling between master list being displayed or the form being displayed
// ticket list doesnt care when its being displayed and neither does ticket form, but the 
// shared state is that both those components need access to manipulate the master list