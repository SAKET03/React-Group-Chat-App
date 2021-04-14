import React, { Component } from 'react';
import { database } from './firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
export default class Chat extends Component {
  constructor() 
  {
    super();    
    this.state = 
    {
      messages: [],
      username: '',
    };
    this.onAddMessage = this.onAddMessage.bind(this);
  }

componentWillMount() 
{
  const username = localStorage.getItem('chat_username');
  this.setState({username: username ? username : 'Unknown'})
  const messagesRef = database.ref('messages')
  .orderByKey()
  .limitToLast(100);

  messagesRef.on('value', snapshot => {
    let messagesObj = snapshot.val();
    let messages = [];
    Object.keys(messagesObj).forEach(key => messages.push(messagesObj[key]));
    messages = messages.map((message) => { return {text: message.text, user: message.user, time: message.time, id: message.key}})
    this.setState(prevState => ({
      messages: messages
    }));
  });
}

onAddMessage(event) 
{
  event.preventDefault();
  const timex = moment().format('LLL');
  console.log(timex);
  database.ref('messages').push({text: this.input.value, user: this.state.username, time: timex});
  this.input.value = ''; 
}

  render() 
  {
    return (
      <div className="box">
        <h2>Group Chat Room</h2>
        <div className="messages-div">
            {
              this.state.messages.map((message) => {
              const _class = message.user === this.state.username ? 'message-left container' : 'message-right container';
              return (
                    <div className={_class}>
                      <h6 className="name-heading">{message.user}</h6>
                      <p className="message">{message.text}</p>
                      <p className="time-left">{message.time}</p>
                    </div>
              )
            })}
        </div>
        <textarea className="text-area" ref={node => this.input = node}></textarea>
        <button className="send_button" onClick={this.onAddMessage}><center> <FontAwesomeIcon icon={faArrowCircleRight} size="2x" /></center></button>
    </div>
    );
  }
}