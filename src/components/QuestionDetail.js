import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAnswerQuestion } from '../actions/shared'


class QuestionDetail extends React.Component {
    state = {
        option :''
    }

    handleRadioButtonChange = (e) => {
        this.setState({
            option:e.target.value
        })
    }

    submitAnswer = (e) => {
        e.preventDefault()
        const questionId= this.props.question.id
        const answer = this.state.option
        const { dispatch } = this.props
        console.log(questionId,answer)
        dispatch(handleAnswerQuestion(questionId,answer))
        this.setState({option:''})
    }

    render () {
        const question = this.props.question
        const user = this.props.users[this.props.authedUser]
        if (user == null) {
            return <Redirect to={{
                pathname: '/login',
                state : {from:this.props.location}
             }} />
        }
        if(question == null) {
            return (<div>404: No such question</div>)
        }
        const questionAuthor = this.props.users[question.author];
        if(user.answers[question.id] == null) {
            return(
                <div className="subContainer">
                    <div>{questionAuthor.name} asks :</div>
                    <div className="questionItem">
                        <img src={questionAuthor.avatarURL} className='listAvatar' alt={`Avatar of ${questionAuthor.name}`}/>
                        <div className="questionInnerItem">
                            <h3>Would you rather ...</h3>
                            <div>
                                <input type="radio" name="questionType" value="optionOne" 
                                onChange={this.handleRadioButtonChange}/>
                                { question.optionOne.text}
                            </div>    
                            <div>
                                <input type="radio" name="questionType" value="optionTwo"
                                onChange={this.handleRadioButtonChange}/>
                                { question.optionTwo.text}
                            </div>
                            <div>
                                <button className="btn" 
                                            types="submit"
                                            disabled={this.state.option ===''}
                                            onClick={this.submitAnswer}>Submit
                                </button>
                            </div>   
                        </div>
                    </div>
                </div>
                )
        }else{
            const optionOneVoters = question.optionOne.votes.length;
            const optionTwoVoters = question.optionTwo.votes.length;
            const allVoters = optionOneVoters+optionTwoVoters;

            return(
                <div className="subContainer">
                     <div>Asked by {questionAuthor.name}</div>
                     <div className="questionItem">
                        <img src={questionAuthor.avatarURL} className='listAvatar' alt={`Avatar of ${questionAuthor.name}`}/>
                        <div className="questionInnerItem">
                            <h3>Results:</h3>
                            <div className="option">
                                {user.answers[question.id] === 'optionOne' ? <div className="yourChoice">Your Choice</div> : null}
                                <div>Would you rather { question.optionOne.text}? </div>
                                <div>{optionOneVoters} of {allVoters} users</div>
                                <div>%{(optionOneVoters / allVoters).toFixed(2)*100} </div>
                            </div>
                            <div className="option">
                                 {user.answers[question.id] === 'optionTwo' ? <div className="yourChoice">Your Choice</div> : null}
                                <div>Would you rather { question.optionTwo.text}?</div>
                                <div>{optionTwoVoters} of {allVoters} users</div>
                                <div>%{(optionTwoVoters / allVoters).toFixed(2)*100} </div>
                            </div>
                        </div>
                     </div>
                </div>
            )
        }
    }

}
function mapStateToProps ({ authedUser,questions,users},props) {
    const questionId = props.match.params['question_id'];
    return {
      authedUser: authedUser,
      users : users,
      question:questions[questionId]
    }
  }
export default connect (mapStateToProps)(QuestionDetail)