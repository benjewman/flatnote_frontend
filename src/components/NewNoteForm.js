import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


const BASE = 'http://localhost:3000'
const NOTES = `${BASE}/notes`

function handleSubmit(event, user) {
    event.preventDefault()
    const title = event.target.querySelector('input').value
    const content = event.target.querySelector('textarea').value
    postFetch(title, content, user)
    console.log('before the redirect')
    return <Redirect to="/dashboard"/>
}

function postFetch(title, content, user) {
    const noteObj = {
        user_id: user.id,
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
    .then(note => console.log(note))
}

function NewNoteForm(props) {
    return (
        <form onSubmit={(event) => handleSubmit(event, props.user)}>
            Title <input type="text" name="title" />
            <br/>
            <br/>
            Notes <textarea name="notes"></textarea>
            <br/>
            <br/>
            <input type="submit" value="Save"/>
        </form>
    )
}

const mapStateToProps = state => {
    return { 
      user: state.user
    }
}

export default connect(mapStateToProps, null)(NewNoteForm)
