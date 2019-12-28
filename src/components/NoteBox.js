import React from 'react'

export default function NoteBox(props) {
    console.log('in the note box')
    return (
        <div class="card">
            <div class="card-header">
                <h3>{props.note.title}</h3>
            </div>
            <div class="card-body">
                <p class="card-text">{props.note.content}</p>
                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
            </div>
        </div>
    )
}