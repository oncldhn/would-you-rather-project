import React from 'react';
import { withRouter } from 'react-router-dom'

class QuestionItem extends React.Component {

    viewPollClicked = (e,id) => {
        e.preventDefault();
        this.props.history.push(`/questions/${id}`)
    }
    render (){
        const question = this.props.question
        return (
            <div>
                <div>{question.optionOne.text}</div> 
                <button
                        types="submit" onClick={ (e) =>this.viewPollClicked(e,question.id)}>View Poll
                    </button>
            </div>
        )
    }
}

export default withRouter(QuestionItem)