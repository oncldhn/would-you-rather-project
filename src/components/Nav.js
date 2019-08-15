import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/authedUser';

class Nav extends React.Component {

handleLogout = () => {
  const dispatch = this.props.dispatch;
  dispatch(logoutUser())
}

render(){
    const authedUser = this.props.authedUser;
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>
          <li></li>
          <li></li>
          <li></li> 
          { authedUser != null ? <li className="UserInfo">Hello, {authedUser.name}</li>:null}
          { authedUser != null ? <img src={authedUser.avatarURL} className='avatar' alt={`Avatar of ${authedUser.name}`}/>:null}
          { authedUser != null ? <li  className="logout" onClick={this.handleLogout}>Logout</li>:null}
         
        </ul>
      </nav>
    )
  }
}
function mapStateToProps ({authedUser,users}) {
  return {
    authedUser: users[authedUser],
  }
}
export default connect (mapStateToProps)(Nav)

