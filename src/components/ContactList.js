import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ContactList.css";

// import the Contact component
import Contact from "./Contact";

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  dragStart(e) {
    // Confirm to get just the element with Class dragItem
    if (e.target.className == "dragItem") {
      this.dragged = e.currentTarget;
    }
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.dragged);
  }
  dragOver(e) {
    e.preventDefault();
    this.dragged.classList.add('dragElem');
    // Confirm to get just the element with Class dragItem
    if (e.target.className == "dragItem") {
      this.over = e.target;
    }
  }
  // dragEnter(e) {
  //   e.target.classList.add('over');
  // }
  // dragLeave(e) {
  //   e.target.classList.remove('over');    
  // }
  dragEnd(e) {
    this.dragged.classList.remove('dragElem');
    // e.target.classList.remove('over');

    // update state
    var data = this.props.contacts;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if (from < to) to--;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({ contacts: data });
  }


  render(){
    return (
      <div>
        <div className="App-title">
          <h1 className="font-size-20 text-bold">Peoples's List</h1>
        </div>
        <ul onDragOver={this.dragOver.bind(this)}>
          {this.props.contacts.map((item, i) =>
            <li
              className='dragItem'
              data-id={i}
              key={i}
              draggable='true'
              onDragEnd={this.dragEnd.bind(this)}
              onDragStart={this.dragStart.bind(this)}>
              <Contact key={item.id} dataid={i} name={item.name} email={item.email} phone={item.phone} company={item.company} street={item.street} />
            </li>
          )}
        </ul>
      </div>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired
};

export default ContactList;
