import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class NoteBox extends React.Component {
    state = {
        toggleChosen: false
    }
    
    pickNote = () => {
        this.props.setNote(this.props.note)
        this.setState({toggleChosen: true})
    }
    
    noteLink = () => {
        return `/note/${this.props.note.id}`
    }
    
    render() {
        return (
            <div onClick={this.pickNote} class="card">
                <div class="card-header">
                    <h3>{this.props.note.title}</h3>
                </div>
                <div class="card-body">
                    <p class="card-text">{this.props.note.content}</p>
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