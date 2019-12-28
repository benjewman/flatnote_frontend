import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


const BASE = 'http://localhost:3000'
const NOTES = `${BASE}/notes`

class NewNoteForm extends React.Component {
    state = {
        redirectToggle: false
    }
    
    handleSubmit = (event) => {
        event.preventDefault()
        const title = event.target.querySelector('input').value
        const content = event.target.querySelector('textarea').value
        this.postFetch(title, content)
        console.log('before the redirect')
        this.setState({redirectToggle: true})
    }
    
    postFetch = (title, content) => {
        const noteObj = {
            user_id: this.props.user.id,
            title: title,
            content: content
        }
        
        const fetchObj = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(noteObj)
        }
    
        fetch(NOTES, fetchObj)
        .then(resp => resp.json())
        .then(note => {
            console.log(note)
            this.props.setNote(note)
            this.props.addNote(note)
            this.setState({note: note})
        })
    }

    handleRoute = () => {
        return `/note/${this.props.note.id}`
    }

    render() {
        return (
            <div>
                {this.state.redirectToggle && this.props.note ? <Redirect to={this.handleRoute()}/> : true}
            <form onSubmit={this.handleSubmit}>
                Title <input type="text" name="title" />
                <br/>
                <br/>
                Notes <textarea name="notes"></textarea>
                <br/>
                <br/>
                <input type="submit" value="Save"/>
            </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
      user: state.user,
      note: state.note
    }
}

const mapDispatchToProps = dispatch => {
    return { 
      setNote: (note) => dispatch({type: 'SET_NOTE', note: note}),
      addNote: (note) => dispatch({type: 'ADD_NOTE', note: note})
   }
  }

export default connect(mapStateToProps, mapDispatchToProps)(NewNoteForm)
