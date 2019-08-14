import  React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class LeaderBoard extends React.Component {

    render () {
        if (this.props.authedUser === null) {
            return <Redirect to='/login' />
        }
        return (
            <div className="subContainer">
                <div className="subHeader">LeaderBoard</div>
                <ul>
                        {this.props.users.map((user) => (
                            <li className="userItem"key={user.id}>
                                
                                    <div><img src={user.avatarURL} className='listAvatar' alt={`Avatar of ${user.name}`}/></div>
                                    <div className="userInfo">
                                        <h3>{user.name}</h3>
                                        <div><b>Answered Questions&nbsp;</b>{user.answeredQuestions}</div>
                                        <div><b>Created Questions&nbsp;</b>{user.createdQuestions}</div>
                                        <div><b>Score&nbsp;</b>{user.score}</div> 
                                    </div>
                                
                             </li>
                        ))}
                </ul>
             </div>
        )
    }
}

function mapStateToProps ({ users,authedUser }) {
    const usersArray = Object.values(users).map((user) => (
       {...user,
        answeredQuestions:Object.keys(user.answers).length+1,
        createdQuestions :user.questions.length+1,
        score : Object.keys(user.answers).length+1 +user.questions.length+1 } ));
    return {
      users: usersArray.sort((a,b) => b.score-a.score ),
      authedUser: authedUser 
    }
  }

export default connect(mapStateToProps) (LeaderBoard)