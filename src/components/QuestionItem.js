import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class QuestionItem extends React.Component {

    viewPollClicked = (e,id) => {
        e.preventDefault();
        this.props.history.push(`/questions/${id}`)
    }
    render (){
        const question = this.props.question
        const user = this.props.users[question.author];
        return (
            <div>
                <div>{user.name} asks :</div>
                <div className="questionItem">
                    <img src={user.avatarURL} className='listAvatar' alt={`Avatar of ${user.name}`}/>
                    <div className="questionInfo">
                        <div>{question.optionOne.text}</div> 
                        <button
                            types="submit" onClick={ (e) =>this.viewPollClicked(e,question.id)}>View Poll
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({users }) {
    return {
       users : users
    }
  }

export default withRouter(connect(mapStateToProps)(QuestionItem))