import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx'

class App extends Component {
  
  constructor(props) {
    super(props);
    this.webSocket = new WebSocket("ws://localhost:3001/");
    this.state =  {
      currentUser: {name: "Anon", id: 0},
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
    console.log(nameChange)
    const newName = [...oldName, {
      username: `${nameChange.username} has changed his name to ${nameChange.newusername}`,
      id: nameChange.id,
      type: nameChange.type,
      content: ""
    }]
    this.setState({
      
      messages: newName,
    
    })
  };



  sendNewMessage = content => {
    const userName = {
      username: this.state.currentUser.name,
      content: content,
      type: "postMessage"
    }
    this.webSocket.send(JSON.stringify(userName));
  }

  sendNotification = (oldName, newName) => {
 
    const newNameObj = {
      newusername: newName,
      username: oldName,
      type: "postNotification"
    }

    this.setState({
      
      currentUser : {...this.state.currentUser, name: newName},
    
    })



    this.webSocket.send(JSON.stringify(newNameObj));
  }


  changeUser = name => {
    const newName = name
    const oldName = this.state.currentUser.name
    
   

    this.sendNotification(oldName, newName);
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
          console.log(receiveData)
        this.setState({currentUser : {name: receiveData.name, id: receiveData.id}, clientSize: receiveData.clients })
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
    <ChatBar changeUser={this.changeUser} sendNotification={this.sendNotification} sendNewMessage={this.sendNewMessage} currentUser={this.state.currentUser} messages={this.state.messages}/>
</div>
    )}
}



export default App;
