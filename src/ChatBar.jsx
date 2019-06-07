import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      content:'',
      userName: ''
    }
    
  }

  // This updates the content of the state as we change the text area
  handleChange = event => {
    this.setState({ content: event.target.value});
    console.log(event.target.value)
  };

  // Detect keystrokes in the text area.
  // If it's the enter key, addNewTweet is called
  handleKeyUp = event => {
    if (event.key === 'Enter') {
      // Need to send content to the App
      this.props.sendNewMessage(this.state.content);
      // Reset the content of the text area
    }
  };

  handleChangeName = event => {
    this.setState({ userName: event.target.value});
  };

  // Detect keystrokes in the text area.
  // If it's the enter key, addNewTweet is called
  handleKeyUpName = event => {
    if (event.key === 'Enter') {
      // Need to send content to the App
      this.props.sendNotification(this.state.userName);
      // Reset the content of the text area
    }
  };
  
    render() {
        return (
          <footer className="chatbar">
            <input className="chatbar-username" placeholder="Your Name (Optional)" onChange={this.handleChangeName} onKeyUp={this.handleKeyUpName} />
            <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.content} onChange={this.handleChange} onKeyUp={this.handleKeyUp}/>
          </footer>
        )
    }
}

export default ChatBar;