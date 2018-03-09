import React, { Component } from 'react'
import './index.css'
import Draggable from 'react-draggable'

class Note extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      noteColor: "#FFFF00",
      positionalAttributes: {},
      text: props.initialText,
    }
  }

  componentWillMount = () => {
    var storedNote = localStorage.getItem(this.props.id);
      if (storedNote) {
        this.setState(JSON.parse(storedNote));
      } else  {
        this.setState({
          positionalAttributes: {
            right: this.randomBetween(0, window.innerWidth - 150, "px"),
            top: this.randomBetween(0, window.innerHeight - 150, "px")
          }
        })
      }
  }

  componentDidUpdate() {
    if (this.state.editing) {
      this.refs.newText.focus()
      this.refs.newText.select()
    } else {
      localStorage.setItem(this.props.id, JSON.stringify(this.state));
    }
  }


  randomBetween(x,y,s){
    return (x + Math.ceil(Math.random() * (y-x))) + s
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.textValue !== nextProps.textValue || this.state !== nextState
  }

  changeNoteColor = (e) => {
    this.setState({
      noteColor: e.target.value
    })
  }

  noteStyle() {
    var styles = {
      backgroundColor: this.state.noteColor,
      ...this.state.positionalAttributes
    }
    return styles;
  }

  edit = () => {
    this.setState({editing: true})
  }

  save = () => {
    this.setState({
      editing: false,
      text: this.refs.newText.value
    })
  }

  remove = () => {
    this.props.onRemove(this.props.id)
  }

  renderForm(){
    return (
      <div className="note"
           style={this.noteStyle()}>
        <textarea ref="newText"
                  defaultValue={this.state.text}></textarea>
        <button onClick = {this.save}>Save</button>
      </div>
    )

  }

  renderDisplay(){
    return (
      <div className ="note"
            style={this.noteStyle()}>
        <p>{this.state.text}</p>
        <span>
          <input type="color" value={this.state.noteColor} onChange={this.changeNoteColor}/>
          <button onClick={this.edit}>EDIT</button>
          <button onClick={this.remove}>X</button>
        </span>
      </div>
    )
  }

  render() {
    return ( <Draggable>
      {(this.state.editing) ? this.renderForm()
                                : this.renderDisplay()}
      </Draggable>
    )
  }
}

export default Note
