import { receiveUsers,addCreatedQuestionToUser,addAnsweredQuestionToUser} from './users'
import { receiveQuestions,addQuestion,addAnswer} from './questions'
import { getInitialData,saveQuestion,saveQuestionAnswer } from '../utils/api'
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

        return saveQuestion({
            author:authedUser,
            optionOneText:optionOneText,
            optionTwoText:optionTwoText
        })
        .then((question)=>dispatch(addQuestion(question)))
        .then((question) => dispatch(addCreatedQuestionToUser(authedUser,question.id)))
    }
}

export function handleAnswerQuestion(questionId,answer) {
    return (dispatch,getState) => {
        const { authedUser } = getState()
        console.log(authedUser,questionId,answer)
        return saveQuestionAnswer({authedUser,qid:questionId,answer})
        .then(dispatch(addAnswer(authedUser,questionId,answer)))
        .then(dispatch(addAnsweredQuestionToUser(authedUser,questionId,answer)))

    }
}