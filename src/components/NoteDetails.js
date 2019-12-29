import React from 'react'
import { connect } from 'react-redux'

const BASE = 'http://localhost:3000'
const NOTES = `${BASE}/notes/`
const NOTE_TAGS =`${BASE}/note_tags`

class NoteDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editToggle: false,
            title: this.props.note.title,
            content: this.props.note.content
        }
    }
    
    deleteNote = () => {
        const fetchObj = {
            method: 'DELETE',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(this.props.note)
        }
        fetch(NOTES + this.props.note.id, fetchObj)
        .then(resp => resp.json())
        .then(data => console.log(data))

        this.props.resetNote()
    }

    renderTags = () => {
        const tagArray = this.props.note.tags.map(tag => tag.name)
        return tagArray.join(', ')
    }

    showEdit = () => {
        this.setState({
            editToggle: true,
            title: this.props.note.title,
            content: this.props.note.content
        })
    }
    
    renderShow = () => {
        console.log(this.props.note.tags)
        return (
            <div>
                <h2>{this.props.note.title}</h2>
                <p>{this.props.note.content}</p>
                <h5>Tags</h5>
                {this.props.note.tags ? this.renderTags() : true}
                <br/>
                <button onClick={this.deleteNote}>Delete</button>
                <button onClick={this.showEdit}>Edit</button>                
            </div>
        )
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
    
    handleSave = (event) => {
        // PUT fetch with state data
        const checkboxes = Array.from(event.target.querySelectorAll('.tagbox'))
        console.log(checkboxes)
        const tagIds = checkboxes.filter(box => box.checked).map(box => parseInt(box.value))
        console.log(tagIds)
        const noteUpdate = {
            title: this.state.title,
            content: this.state.content
        }
        
        const fetchObj = {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(noteUpdate)
        }

        fetch(NOTES + this.props.note.id, fetchObj)
        .then(resp => resp.json())
        .then(note => console.log(note))

        tagIds.forEach(tagId => this.fetchNoteTag(tagId, this.props.note.id))
        this.setState({editToggle: false})

    }

    handleTitleChange = (event) => {
        this.setState({title: event.target.value})
    }

    handleContentChange = (event) => {
        this.setState({content: event.target.value})
    }
    
    renderEdit = () => {
        return (
            <div>
                <form onSubmit={this.handleSave}>
                    Title: <input onChange={this.handleTitleChange} type="text"  value={this.state.title}/>
                    Content: <input onChange={this.handleContentChange} type="text"  value={this.state.content}/>
                    <h5>Tags</h5><br/>
                    {this.renderTagBoxes()}
                    <button type="submit">Save</button>
                </form>
            </div>
        )
    }

    handleCheck = (event) => {
        event.target.checked = !event.target.checked
    }

    renderTagBoxes = () => {
        const checkedTagIds = this.props.note.tags.map(tag => tag.id)
        console.log(checkedTagIds)
        return this.props.tags.map(tag => {
            return (
                <div>
                    {tag.name}
                    {/* {checkedTagIds.includes(tag.id) ? <input  onChange={this.handleUncheck} type="checkbox" class="tagbox" value={tag.id} checked /> : <input type="checkbox" class="tagbox" value={tag.id} />}  */}
                    <input onChange={this.handleCheck} type="checkbox" class="tagbox" value={tag.id} checked={checkedTagIds.includes(tag.id)}/>
                </div>
            )
        })
    }
    
    render = () => {
        console.log(this.props.note)
        return (
            <div>
                {this.state.editToggle ? this.renderEdit() : this.renderShow()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
      note: state.note,
      tags: state.tags
    }
}

const mapDispatchToProps = dispatch => {
    return { 
        resetNote: () => dispatch({type: 'SET_NOTE', note: undefined}),
        setNote: (note) => dispatch({type: 'SET_NOTE', note: note})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetails)