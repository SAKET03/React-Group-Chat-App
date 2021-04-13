import React, { Component} from 'react';
import { database } from './firebase';

export default class User extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      username: ''
    };
  }

  componentWillMount() {
    const userRef = database.ref('users')
      .orderByKey()
      .limitToLast(100);

    userRef.once('value', snapshot => {
      const users = [snapshot.val()];
      this.setState({users: users});
    });
  }

  onNameChange(e) {
    this.setState({username: e.target.value})
  }

  onAddClick(e) {
    e.preventDefault();
    database.ref('users').push({username: this.state.username});
    localStorage.setItem('chat_username', this.state.username);
    this.props.history.push('/chat');
  }

  render() {
    return(
    <div class="contact">
        <div className="label">
          <h2 class="username"> Enter Username:</h2>
          <input className="username_input" id="inputsm" type="text" onChange={this.onNameChange.bind(this)}/>
          <button className="username_add" onClick={this.onAddClick.bind(this)}>Add</button>
        </div>
    </div>
    );
  }
}