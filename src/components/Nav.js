import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends React.Component {
render(){
    const authedUser = this.props.authedUser;
    const loginOrLogout = authedUser == null ? 'Login' :'Logout'
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
            <NavLink to='/Leaderboard' activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>
          <li></li>
          <li></li>
          { authedUser != null ?  <div>
                                  <li>Hello {authedUser}</li>
                                  <li className="logout">
                                  <button
                                        types="submit">{loginOrLogout}
                                      </button>
                                  </li>
                                  </div>
                                :null}
       
        </ul>
      </nav>
    )
  }
}
function mapStateToProps ({ authedUser }) {
  return {
    authedUser: authedUser
  }
}
export default connect (mapStateToProps)(Nav)

