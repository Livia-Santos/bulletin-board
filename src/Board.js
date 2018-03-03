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
    var self = this

    if(this.props.count) {
      fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
        .then(response => response.json())
        .then(json => json[0]
                          .split(". ")
                          .forEach(sentence => self.add(sentence.substring(0, 24))))
    }
  }

  nextId = () => {
    this.uniqueId = this.uniqueId || 0
    return this.uniqueId++
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
