import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/shared'


class AddQuestion extends React.Component {

    state={
        firstOptionText:'',
        secondOptionText:'',
        toHome: false
    }

    handleChange = (e) => {
        const text = e.target.value
        if(e.target.id === 'firstOption'){
            this.setState(() => ({
                firstOptionText:text
              }))
        }else{
            this.setState(() => ({
                secondOptionText:text
              }))
        }
       
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        const {firstOptionText,secondOptionText} = this.state;

        if(firstOptionText === secondOptionText) {
            alert('Options cannot be the same')
            return;
        }

        const { dispatch } = this.props

        dispatch(handleAddQuestion(firstOptionText,secondOptionText))
        this.setState(()=> ({
            firstOptionText:'',
            secondOptionText:'',
            toHome:true,
        }))
    }


    render(){
        if (this.state.toHome === true) {
            return <Redirect to='/' />
        }
        if (this.props.authedUser === null) {
            return <Redirect to={{
                pathname: '/login',
                state : {from:this.props.location}
             }} />
        }
        const { firstOptionText, secondOptionText } = this.state
        return(
            <div className="subContainer">
                <div className="subHeader">Create Question</div>
                <div>Would you rather...</div>
                <form className='new-tweet' onSubmit={this.handleSubmit}>
                    <input  id="firstOption" 
                            className='textarea' 
                            onChange={this.handleChange}
                            value={firstOptionText}>
                    </input>
                    <div>OR</div>
                    <input id="secondOption"  
                            className='textarea' 
                            onChange={this.handleChange}
                            value={secondOptionText}>
                    </input>
                    <button className="btn" 
                            types="submit"
                            disabled={firstOptionText === '' || 
                            secondOptionText === ''}>Submit
                    </button>
                </form>
            </div>
        )
    }
}

function mapStateToProps ({authedUser}) {
    return {
        authedUser:authedUser
    }
}

export default connect(mapStateToProps)(AddQuestion)