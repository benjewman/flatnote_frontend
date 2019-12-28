import React from 'react'

export default function NoteBox(props) {
    console.log('in the note box')
    return (
        <div>
            <h3>{props.note.title} -</h3>
            <p>{props.note.content}</p>
        </div>
    )
}