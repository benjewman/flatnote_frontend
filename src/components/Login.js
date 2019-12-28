import React from 'react';
import { connect } from 'react-redux'

class Login extends React.Component {
    state = {
        input: ""
    }

    handleChange = event => {
        this.setState({input: event.target.value})
    }

    handleSubmit = () => {
        this.props.chooseUser(this.state.input)
    }
    
    render() {
        return (
            <div>
                <input value={this.state.input} type="text" onChange={this.handleChange}/>
                <button onClick={this.handleSubmit}>Login</button>
            </div>
        )
    } 
}

const mapDispatchToProps = dispatch => {
    return { chooseUser: (thisState) => dispatch({type: 'CHOOSE_USER', username: thisState}) }
}

export default connect(null, mapDispatchToProps)(Login)