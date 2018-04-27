import React, { Component } from "react";
// import { Pipedrive } from 'pipedrive';
import logo from "./logo_pipedrive.svg";
import "./App.css";

import axios from "axios";

// Component List
import ContactList from "./components/ContactList";

const pipedriveAPI = 'https://api.pipedrive.com/v1/persons?api_token=c26e361482bef8f8d2cc9db39aee5c131b93f9a1';

class App extends Component {
  state = { contacts: [] };

  componentDidMount() {
    axios
      .get( pipedriveAPI )
      .then(response => {
        console.log(response.data.data);
        
        const newContacts = response.data.data.map(item => {
          return {
            id: item.id,
            name: item.name,
            phone: item.phone[0].value,
            email: item.email[0].value,
            organization: item.org_name,
            assistant: 'assistant - ' + item._0f20ca87fccf3a5137d524251ad9171dc1814429,
            group: 'group - ' + item._9b112aa2534fa67a46a1f89044977fee0911858a
            // Filed compiled - when a custon field start with number I took a print to show, I didn't find a solution for this one solution js included a _ in front of the key when create the custom field
            // Print: https://www.screencast.com/t/S1CWQpGzo
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
