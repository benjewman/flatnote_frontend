import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


const BASE = 'http://localhost:3000'
const NOTES = `${BASE}/notes`
const NOTE_TAGS =`${BASE}/note_tags`

class NewNoteForm extends React.Component {
    state = {
        redirectToggle: false
    }
    
    handleSubmit = (event) => {
        event.preventDefault()
        const title = event.target.querySelector('input').value
        const content = event.target.querySelector('textarea').value
        const checkboxes = event.target.querySelectorAll('.tagbox')
        const checkboxArray = Array.from(checkboxes)
        console.log(checkboxArray)
        // checked is the array of checked tag ids
        const checked = checkboxArray.filter(box => box.checked).map(box => parseInt(box.value))
        console.log(checked)
        this.postFetch(title, content, checked)
        console.log('before the redirect')
        this.setState({redirectToggle: true})
    }

    fetchNoteTag = (tagId, noteId) => {
        const noteTagObj = {
            tag_id: tagId,
            note_id: noteId
        }
        const postObj = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(noteTagObj)
        }
        fetch(NOTE_TAGS, postObj)
        .then(resp => resp.json())
        .then(noteTag => console.log(noteTag))
    }
    
    postFetch = (title, content, checkedTagIds) => {
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
            checkedTagIds.forEach(tagId => this.fetchNoteTag(tagId, note.id))
            this.props.setNote(note)
            this.props.addNote(note)
            this.setState({note: note})
        })
    }

    handleRoute = () => {
        return `/note/${this.props.note.id}`
    }

    renderTagBoxes = () => {
        console.log(this.props.tags)
        return this.props.tags.map(tag => {
            return (
                <div>
                    {tag.name}
                    <input type="checkbox" class="tagbox" value={tag.id}/> 
                </div>
            )
        })
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
                Tags <br/>
                {this.props.tags ? this.renderTagBoxes() : true }
                <input type="submit" value="Save"/>
            </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
      user: state.user,
      note: state.note,
      tags: state.tags
    }
}

const mapDispatchToProps = dispatch => {
    return { 
      setNote: (note) => dispatch({type: 'SET_NOTE', note: note}),
      addNote: (note) => dispatch({type: 'ADD_NOTE', note: note})
   }
  }

export default connect(mapStateToProps, mapDispatchToProps)(NewNoteForm)
