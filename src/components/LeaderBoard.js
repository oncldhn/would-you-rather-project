import  React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class LeaderBoard extends React.Component {

    render () {
        if (this.props.authedUser === null) {
            return <Redirect to='/login' />
        }
        return (
            <div>
                <h3>LeaderBoard</h3>
                <ul className='dashboard-list'>
                        {this.props.users.map((user) => (
                            <li key={user.id}>
                                 <div>
                                    <div>{user.name}</div>
                                    <div>Answered Questions{user.answeredQuestions}</div>
                                    <div>Created Questions{user.createdQuestions}</div>
                                    <div>Score{user.score}</div> 
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