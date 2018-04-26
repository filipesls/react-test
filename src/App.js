import React, { Component } from "react";
import logo from "./logo_pipedrive.svg";
import "./App.css";

import axios from "axios";

// Component List
import ContactList from "./components/ContactList";

class App extends Component {
  state = { contacts: [] };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        const newContacts = response.data.map(c => {
          return {
            id: c.id,
            name: c.name,
            email: c.email,
            phone: c.phone,
            company: c.company.name,
            street: c.address.street
          };
        });
        
        const newState = Object.assign({}, this.state, {
          contacts: newContacts
        });

        this.setState(newState);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <ContactList contacts={this.state.contacts} />
      </div>
    );
  }
}

export default App;
