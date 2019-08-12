import React from 'react';
import QuestionItem from './QuestionItem';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


class Home extends React.Component {
    state = {
        selectedValue : "unanswered"
    }

    handleChange = (e) => {
        this.setState(
            {
                selectedValue:e.target.value
            }
        )
        } 

    render (){
        if (this.props.authedUser === null) {
            return <Redirect to='/login' />
        }
        const user = this.props.user
        const showUnanswered = this.state.selectedValue === 'unanswered'
        const filteredQuestions = this.props.questions.filter(question => showUnanswered ? 
            user.answers[question.id] == null : user.answers[question.id] != null)
        return (
            <div>
                <input type="radio" name="questionType" value="unanswered" 
                    checked={this.state.selectedValue==='unanswered'} onChange={this.handleChange}/>
                    Unanswered Questions
                <input type="radio" name="questionType" value="answered" 
                    checked={this.state.selectedValue==='answered'} onChange={this.handleChange}/>
                    Answered Questions
                <h3 className='center'>Questions</h3>
                <ul className='dashboard-list'>
                    {filteredQuestions.map((question) => (
                     <li key={question.id}>
                        <QuestionItem question={question}/>
                      </li>
                     ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps ({ questions,authedUser,users }) {
    return {
        questions: Object.values(questions),
        authedUser: authedUser,
        user : users[authedUser]
    }
  }

export default connect(mapStateToProps) (Home)