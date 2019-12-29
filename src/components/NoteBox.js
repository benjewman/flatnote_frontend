import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const NOTES = 'http://localhost:3000/notes/'

class NoteBox extends React.Component {
    state = {
        toggleChosen: false
    }
    
    pickNote = () => {
        fetch(NOTES + this.props.note.id)
        .then(resp => resp.json())
        .then(note => this.props.setNote(note))
        this.setState({toggleChosen: true})
    }
    
    noteLink = () => {
        return `/note/${this.props.note.id}`
    }
    
    render() {
        return (
            <div onClick={this.pickNote} className="card">
                <div className="card-header">
                    <h3>{this.props.note.title}</h3>
                </div>
                <div className="card-body">
                    <p className="card-text">{this.props.note.content}</p>
                </div>
                {this.state.toggleChosen ? <Redirect to={this.noteLink()}/> : true}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return { 
      setNote: (note) => dispatch({type: 'SET_NOTE', note: note}),
   }
  }
  
  export default connect(null, mapDispatchToProps)(NoteBox)