import { receiveUsers,addCreatedQuestionToUser} from './users'
import { receiveQuestions,addQuestion} from './questions'
import { getInitialData,saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'


export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
        .then(({users,questions}) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            dispatch(hideLoading())
        })
    }
}

export function handleAddQuestion(optionOneText,optionTwoText) {
    return (dispatch,getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())
        
        return saveQuestion({
            author:authedUser,
            optionOneText:optionOneText,
            optionTwoText:optionTwoText
        })
        .then((question)=>dispatch(addQuestion(question)))
        .then((question) => dispatch(addCreatedQuestionToUser(authedUser,question.id)))
        .then(()=> dispatch(hideLoading()))
    }
}