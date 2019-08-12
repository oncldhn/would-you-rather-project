import React from 'react';

class QuestionItem extends React.Component {

    render (){
        const question = this.props.question
        console.log(question)
        return (
           <div>{this.props.question.optionOne.text}</div> 
        )
    }
}

export default QuestionItem