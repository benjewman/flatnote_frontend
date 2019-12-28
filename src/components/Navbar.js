import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Navbar extends React.Component {
    
    handleClick = () => {
        this.props.resetUsername()
        this.props.resetNote()
        this.props.resetUser()
        this.props.resetNotes()
    }
    
    render() {
        return (
            <nav className="navbar navbar-light bg-light">
                <span className="navbar-brand mb-0 h1">Flatnote</span>
                <Link to="/note/new" className="navbar-brand mb-0 h1">New Note</Link>                        
                <Link onClick={this.handleClick} to="/login" className="navbar-brand mb-0 h1">SignOut</Link>                        
            </nav>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return { 
        resetUsername: () => dispatch({type: 'CHOOSE_USER', username: undefined}),
        resetUser: () => dispatch({type: 'SET_USER', user: undefined}),
        resetNotes: () => dispatch({type: 'SET_NOTES', notes: undefined}),
        resetNote: () => dispatch({type: 'SET_NOTE', note: undefined})
    }
}

export default connect(null, mapDispatchToProps)(Navbar)

