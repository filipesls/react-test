import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Contact.css";
import icon_building from "./icon_building.svg";

class Contact extends Component {
  constructor(props){
    super(props);
    
    this.state = { isOpen: false };
  }
  
  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render(){
    return (
      <div onClick={this.toggleModal} className="app-itemList-container">

        <div className="app-itemList-info">
          <h3>{this.props.name}</h3>
          <div className="app-itemList-company">
            <img src={icon_building} className="icon" alt="logo" />
            <span className="text">{this.props.organization}</span>
          </div>
        </div>
        <div className="app-itemList-img">
          <img src="https://www.w3schools.com/w3css/img_avatar4.png" alt="Avatar" className="app-img app-circle" />
        </div>

        <Modal show={this.state.isOpen} onClose={this.toggleModal} name={this.props.name} phone={this.props.phone} >
          <p className="personal-modal-info"><label>Email:</label> {this.props.email}</p>
          <p className="personal-modal-info"><label>Organization:</label> {this.props.organization}</p>
          <p className="personal-modal-info"><label>Assistant:</label> {this.props.assistant}</p>
          <p className="personal-modal-info"><label>Group:</label> {this.props.group}</p>
        </Modal>
      </div>
    );
  }

}

const Modal = ({ toggleModal, show, name, phone, children }) => {

  const showHideClassName = show ? 'app-modal display-block' : 'app-modal display-none';

  return (
    <div className={showHideClassName}>
      <div className="app-modal-content app-animate-zoom">

        <header className="app-container app-header-footer app-border-bottom font-size-16">
          <span onClick={toggleModal} className="app-button app-display-topright">&times;</span>
          <h2 className="text-bold">Person Information</h2>
        </header>

        <div className="app-body">

          <div className="app-container text-center">
            <img src="https://www.w3schools.com/w3css/img_avatar4.png" alt="Avatar" className="app-img app-circle" />
            <p className="font-size-16 text-bold">{name}</p>
            <p className="font-size-16 text-bold color-light-green">{phone}</p>
          </div>

          <hr className="hr-style" />

          <div className="app-container">
            {children}
          </div>

        </div>

        <footer className="app-container app-header-footer app-border-top text-right">
          <button className="app-button app-button-default" onClick={toggleModal} type="button">Cancel</button>
        </footer>

      </div>
    </div>
  );

};


Contact.propTypes = {
  name: PropTypes.string.isRequired
};

export default Contact;