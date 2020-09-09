
import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false
    };
  }

  handleClick = () => {
    this.setState(prevState => ({
      formVisibleOnPage: false, 
      masterTicketList: []
    }));                           //if you can see the form, you can see the button
  }

  handleAddingNewTicketToList = (newTicket) => { // beginning the passing of prop from child to parent, this argument comes from ticket form .js with all the new ticket properties (the one called onNewTicketCreation)
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
      currentlyVisibleState = <TicketList ticketList={this.state.masterTicketList} />; // show the list of tickets
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