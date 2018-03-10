import React, { Component } from 'react'
import './index.css'
import Note from "./Note"

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: []
    }
  }

  componentWillMount() {
    var storedState = localStorage.getItem("notes");
    if (storedState) {
      this.setState(JSON.parse(storedState));
    }
  }


  componentDidUpdate() {
    localStorage.setItem("notes", JSON.stringify(this.state));
  }

  nextId = () => {
    return this.state.notes.length + 1  
  }

  add = (text) => {
    var notes = [
      ...this.state.notes,
      {
        id: this.nextId(),
        initalText: text
      }
    ]
    this.setState({notes})
  }

  remove = (id) => {
    var notes = this.state.notes.filter(note => note.id !== id)
    this.setState({notes})
  }

  renderNote = (note) => {
    return(<Note key={note.id}
                 id={note.id}
                 initialText={note.initalText}
                 onRemove={this.remove} />);
  }

  render() {
    return(<div className='board'>
            {this.state.notes.map(this.renderNote)}
            <button onClick={()=> this.add("New Note")}>+</button>
          </div>)
  }
}


export default Board;
