import React, { Component } from 'react'; 
import Message from './Message.jsx'

class MessageList extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const messagesList = this.props.messages.map(messageObj => (
            <Message username={messageObj.username} content={messageObj.content} key={messageObj.id}/>
        ))

        return (<main className="messages">
            {messagesList}  
    
    <div className="message system">
          
    </div>
  </main>)}
}

export default MessageList;