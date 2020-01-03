import React from 'react'
import { connect } from 'react-redux'

const BASE = 'http://localhost:3000'
const NOTES = `${BASE}/notes/`
const NOTE_TAGS =`${BASE}/note_tags/`

class NoteDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editToggle: false,
            title: this.props.note.title,
            content: this.props.note.content,
            // noteTags: this.props.note.tags.map(tag => tag.name)
            noteTags: []
        }
    }
    
    deleteNote = () => {
        const fetchObj = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            // body: JSON.stringify(this.props.note)
        }

        fetch(NOTES + this.props.note.id, fetchObj)
        .then(resp => resp.json())
        .then(data => console.log(data))

        this.props.removeNote(this.props.note)
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

    deleteFetchNoteTag = (noteTagId) => {
        const postObj = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "DELETE",
        }
        fetch(NOTE_TAGS + noteTagId, postObj)
        .then(resp => resp.json())
        .then(noteTag => console.log('destroy message', noteTag))
    }

    fetchNoteTag = (tagId) => {
        const noteTagObj = {
            tag_id: tagId,
            note_id: this.props.note.id
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
        .then(noteTag => console.log('NEW TAG', noteTag))

        const tagToAdd = this.props.tags.find(tag => tag.id === tagId)
        this.props.addTag(tagToAdd)
    }
    
    handleSave = (event) => {
        // PUT fetch with state data
        const checkboxes = Array.from(event.target.querySelectorAll('.tagbox'))
        const unchecked = checkboxes.filter(box => !box.checked)
        const checked = checkboxes.filter(box => box.checked)
        const myTagIds = this.props.note.tags.map(tag => tag.id)
       
        console.log('myTagIds', myTagIds)

        const checkedTagIds = checked.filter(box => !myTagIds.includes(parseInt(box.value))).map(box => parseInt(box.value))
        
        const uncheckedTagIds = unchecked.filter(box => myTagIds.includes(parseInt(box.value))).map(box => parseInt(box.value))
        const uncheckedNoteTagIds = uncheckedTagIds.map(id => this.props.note.note_tags.find(noteTag => noteTag.tag_id === id)).map(noteTags => noteTags.id)

        checkedTagIds.forEach(tagId => this.fetchNoteTag(tagId))
        uncheckedNoteTagIds.forEach(noteTagId => this.deleteFetchNoteTag(noteTagId))

        this.putFetchNote()
        this.fetchUserNotes()
        this.setState({editToggle: false})
    }

    fetchUserNotes = () => {
        fetch(`${BASE}/users/${this.props.user.id}`)
        .then(resp => resp.json())
        .then(user => this.props.setNotes(user.notes))
    }

    putFetchNote = () => {
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
        .then(note => this.props.setNote(note))
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
        // event.target.checked = !event.target.checked
        console.log(event.target.checked)
        if (!event.target.checked) {
            const newNoteTags = this.props.note.tags.filter(tag => tag !== event.target.name)
            
            this.setState({ noteTags: newNoteTags })
        } else {
            const newNoteTags = this.props.note.tags
            newNoteTags.push(event.target.name)
            console.log('new Note Tags', newNoteTags)
            console.log(
                '======================='
            )
            this.setState({ noteTags: newNoteTags })
        }
    }

    renderTagBoxes = () => {
        // const checkedTagIds = this.props.note.tags.map(tag => tag.id)
        // console.log(checkedTagIds)
        
        return this.props.tags.map(tag => {
            // debugger
            return (
                <div>
                    {tag.name}
                    <input onChange={this.handleCheck} type="checkbox" className="tagbox" name={tag.name} value={tag.id} checked={this.state.noteTags.includes(tag.name)}/>
                </div>
            )
        })
    }

    setTagCheck = tag => {
        this.setState({ [tag.name + 'Check']: true })
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({ noteTags: nextProps.note.tags.map(tag => tag.name) })
    // }
    
    render = () => {
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
      tags: state.tags,
      user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return { 
        resetNote: () => dispatch({type: 'SET_NOTE', note: undefined}),
        setNote: (note) => dispatch({type: 'SET_NOTE', note: note}),
        removeNote: (note) => dispatch({type: 'REMOVE_NOTE', note: note}),
        setNotes: (notes) => dispatch({type: 'SET_NOTES', notes: notes}),
        addTag: (tag) => dispatch({type: 'ADD_TAG_TO_NOTE', tag: tag})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetails)