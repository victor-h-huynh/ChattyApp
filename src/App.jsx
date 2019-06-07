import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx'

class App extends Component {
  
  constructor(props) {
    super(props);
    this.webSocket = new WebSocket("ws://localhost:3001/");
    this.state =  {
      currentUser: {name: "Bob"},
      messages: [],
      clientSize: 0
    };
  }

  addNewMessage = content => {
    const oldMessages = this.state.messages;
    const newMessage = [...oldMessages, {
      username: content.username,
      content: content.content,
      id: content.id,
      type: content.type
    }]
    this.setState({
      messages: newMessage
    })
  };

  showNotification = nameChange => {
    const oldName = this.state.messages;
    const newName = [...oldName, {
      username: `${this.state.currentUser.name} has changed his name to ${nameChange.username}`,
      id: nameChange.id,
      type: nameChange.type,
      content: ""
    }]
    this.setState({
      currentUser: {name: nameChange.username},
      messages: newName
    })
  };

changeUser = name => {
  this.setState({
    currentUser: {name: name}
  })
}

  sendNewMessage = content => {
    const userName = {
      username: this.state.currentUser.name,
      content: content,
      type: "postMessage"
    }
    this.webSocket.send(JSON.stringify(userName));
  }

  sendNotification = name => {
    const newName = {
      username: name,
      type: "postNotification"
    }
    this.webSocket.send(JSON.stringify(newName));
  }

  componentDidMount() {
    
    this.webSocket.addEventListener("open",function(event) {})      
    this.webSocket.onmessage = (event) => {
      const receiveData = JSON.parse(event.data);
      
      switch (receiveData.type) {
        case 'incomingMessage':
        this.addNewMessage(receiveData);
        break;
        case 'incomingNotification':
        this.showNotification(receiveData);
        break;
        case 'clientSize':
        this.setState({ clientSize: receiveData.clients })
      }
    }
  }
    


  render() {
    return (
<div>
  <nav className="navbar">
    <a href="/" className="navbar-brand">Chatty</a>
    <h1 className="usersOnline"> Users Online: {this.state.clientSize}</h1>
  </nav>
    <MessageList messages={this.state.messages}/>
    <ChatBar sendNotification={this.sendNotification} sendNewMessage={this.sendNewMessage} currentUser={this.state.currentUser} messages={this.state.messages}/>
</div>
    )}
}



export default App;
