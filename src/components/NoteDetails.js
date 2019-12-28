import React from 'react'
import { connect } from 'react-redux'

const NOTES = 'http://localhost:3000/notes/'

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
    }

    renderTags = () => {
        const tagArray = this.props.note.tags.map(tag => tag.name)
        return tagArray.join(', ')
    }

    showEdit = () => {
        this.setState({editToggle: true})
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

    handleSave = () => {
        // PUT fetch with state data
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
                Title: <input onChange={this.handleTitleChange} type="text"  value={this.state.title}/>
                Content: <input onChange={this.handleContentChange} type="text"  value={this.state.content}/>
                <h5>Tags</h5>
                <button onClick={this.handleSave}>Save</button>
            </div>
        )
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
      note: state.note
    }
}

const mapDispatchToProps = dispatch => {
    return { 
        resetNote: () => dispatch({type: 'SET_NOTE', users: undefined}),
        setNote: (note) => dispatch({type: 'SET_NOTE', note: note})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetails)