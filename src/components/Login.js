import React from 'react';
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
    state = {
        selectedUser:'ph',
        toHome:false
    }
    handleChange = (e) => { 
        const authedUserId = e.target.value
        this.props.dispatch(setAuthedUser(authedUserId))
        this.setState (() => ({
            selectedUser : authedUserId,
            toHome: true
        }))
    }
    render () {
        if (this.state.toHome === true) {
            return <Redirect to='/' />
        }
        return (
          <div className="login">
            <div>Sign In</div>
                <select onChange={this.handleChange} value={this.state.selectedUser}>
                <option value='ph' disabled>Select User</option>
                    {this.props.userList.map(
                        (user) => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>         
         </div>
        )
      }
}

function mapStateToProps ({ users }) {
    return {
        userList :Object.values(users),
    }
  }

export default connect(mapStateToProps) (Login)