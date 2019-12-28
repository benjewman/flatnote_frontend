import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import NoteContainer from './NoteContainer'
import NoteBox from '../components/NoteBox'
import NoteDetails from '../components/NoteDetails'

const BASE = 'http://localhost:3000'
const USERS = `${BASE}/users`

class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            notes: []
        }
    }
    
    checkForUsers() {
        console.log('setting user')
        if (!(this.props.username)) {
            return <Redirect to="/login"/>
        }
    }

    fetchNotes = () => {
        console.log('fetching notes', this.props)
        fetch(`${USERS}/${this.props.user.id}`)
        .then(resp => resp.json())
        .then(user => this.props.setNotes(user.notes))
    }

    renderNotes = () => {
        console.log('rendering notes')
        return this.props.notes.map(note => <NoteBox note={note}/>)
    }

    setOrCreateUser() {
        console.log(this.props.users)
        const usernameArray = this.props.users.map(user => user.username)
        if (usernameArray.includes(this.props.username)) {
          const chosenUser = this.props.users.find(user => user.username === this.props.username)
          this.props.setUser(chosenUser)
        } else {
            // post fetch new user
            const postObj = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({username: this.props.username})
            }
            fetch(USERS, postObj)
            .then(resp => resp.json())
            .then(user => this.props.setUser(user))
        }
    }

    setNoteState = () => {
        this.setState({
            notes: this.props.notes
        })
    }

    conditionalDetails = () => {
        if (this.props.note) {
            return <NoteDetails />
        }
    }
    
    render() {
        console.log(this.props)
        return (
            <div class="container">
                <div class="row">
                    <div class="col">
                        {/* {this.renderNotes()} */}
                        {!(this.props.user) && this.props.users ? this.setOrCreateUser() : true}
                        {!this.props.notes && this.props.user ? this.fetchNotes() : true}
                        {/* {this.props.notes && this.props.notes.length !== this.state.notes.length ? this.fetchNotes() : true} */}
                        {this.props.notes ? this.renderNotes() : true}
                    </div>
                    <div class="col">
                        {this.conditionalDetails()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return { 
      setNotes: (notes) => dispatch({type: 'SET_NOTES', notes: notes}),
      setUser: (user) => dispatch({type: 'SET_USER', user: user})
   }
}

const mapStateToProps = state => {
    return { 
      username: state.username, 
      users: state.users,
      user: state.user,
      notes: state.notes,
      note: state.note
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
