import React from 'react'
import { connect } from 'react-redux'

class NoteDetails extends React.Component {
    render() {
        return (
            <div>
                <h2>{this.props.note.title}</h2>
                <p>{this.props.note.content}</p>
                <h4>Tags</h4>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
      note: state.note
    }
}

export default connect(mapStateToProps, null)(NoteDetails)