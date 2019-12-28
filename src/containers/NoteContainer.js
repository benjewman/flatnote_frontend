import React from 'react'
import { connect } from 'react-redux'

const BASE = 'http://localhost:3000'
const USERS = `${BASE}/users`

class NoteContainer extends React.Component {
    
    render() {
        return 'note container'
    }
}

const mapStateToProps = state => {
    return { 
      username: state.username, 
      users: state.users,
      user: state.user
    }
}

export default connect(mapStateToProps, null)(NoteContainer)