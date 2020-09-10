
import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';


class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = { // this is the base state to be updated as we go
      formVisibleOnPage: false,   // by default: newTicketForm = hidden, TicketList = show
      masterTicketList: [], // instantiate empty array to be populated with ticket objects 
      selectedTicket: null,
      editing: false                          
    };
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {  //if starting on ticket details, the following should happen when button is clicked
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,   // prevState is actually current state so this just changes from false to true depending on what current state the page is on
      }));
    }
  } 
  
  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.masterTicketList.filter(ticket => ticket.id === id)[0]; // zeroith index because the filter results in an array of one ticket, so we are grabbing the only ticket and getting rid of array
    this.setState({selectedTicket: selectedTicket}); // selected ticket is not the ticket we have filtered out
  }

  handleEditingTicketInList = (ticketToEdit) => {                       // [{ticket1}, {ticket2}, {ticket3}]    {ticketToEdit} = NEW ticket3
    const editedMasterTicketList = this.state.masterTicketList          // [{ticket1}, {ticket2}, {ticket3}]        //previous master list
      .filter(ticket => ticket.id !== this.state.selectedTicket.id)     // [{ticket1}, {ticket2}]                   //previous master list - ticket selected by id. uses filter method to include every ticket that does not match the selected id and makes that a new master list
      .concat(ticketToEdit);                                            //[{ticket1}, {ticket2}, {ticketToEdit}]    //add updated ticket state to the master list
    this.setState({
        masterTicketList: editedMasterTicketList,
        editing: false,
        selectedTicket: null
      });
  }

  // funtion below adds new ticket entries to the master list of tickets, but it needs access to the form so it is passed to NewTicketForm in the render
  handleAddingNewTicketToList = (newTicket) => { // Method for adding new ticket to master list, the parameter "newTicket" comes from ticketForm.js with all the new ticket properties (form data). This method will be saved as the onNewTicketCreation property on NewTicketForm.
    const newMasterTicketList = this.state.masterTicketList.concat(newTicket); // returns brand new array and adds new ticket element saves it in new master ticket list
    this.setState({
      masterTicketList: newMasterTicketList, //then we are setting set current state to mastertickelist, this is just like the stuff we did in week one with the plant factory!
      formVisibleOnPage: false });
  }

  handleDeletingTicket = (id) => {
    const newMasterTicketList = this.state.masterTicketList.filter(ticket => ticket.id !== id);
    this.setState({
      masterTicketList: newMasterTicketList,
      selectedTicket: null
    });
  }
  

  render(){
    let currentlyVisibleState = null; // create a null variable that can be used in conditional to determine which state is visible
    let buttonText = null; // create null button variable that can be used fo conditional

    if (this.state.editing ) {      
      currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail ticket = {this.state.selectedTicket} onClickingDelete = {this.handleDeletingTicket} onClickingEdit = {this.handleEditClick}/>
      buttonText = "Return to Ticket List";
    } 
    else if (this.state.formVisibleOnPage) { // if the form is visible
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} /> // this is where we pass child to parent, on is often used for props and this is passed into NewTickeForm (other file)
      buttonText = "Return to Ticket List"; // and show return to ticket list text on button
    } else {                                    // otherwise
      currentlyVisibleState = <TicketList ticketList={this.state.masterTicketList} onTicketSelection={this.handleChangingSelectedTicket} />; // pass masterlist to the ticketlist component and also show the ticket list
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