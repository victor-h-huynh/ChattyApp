import React, { Component } from 'react';

class Message extends Component {
    render(){
      const isImage = this.props.content.match(/[\/.](gif|jpg|jpeg|tiff|png)$/i)
        return (
        <div className="message">
        <span className="message-username">{this.props.username}</span>
        <span className="message-content">
          {
            isImage ? 
            <img src={this.props.content} />
            :
            this.props.content  
          }
        </span>
      </div>
      )
    }
}

export default Message;