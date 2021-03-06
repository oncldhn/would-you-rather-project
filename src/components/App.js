import React, { Fragment } from 'react'
import LeaderBoard from './LeaderBoard'
import Login from './Login'
import Home from './Home'
import AddQuestion from './AddQuestion'
import QuestionDetail from './QuestionDetail'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'


class App extends React.Component {
  
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render () {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
          <Nav />
          {this.props.loading === true ? null
          : <div className="mainContainer">
              <Route path='/' exact component={Home}/>
              <Route path='/leaderboard'  component={LeaderBoard}/>
              <Route path='/login'  component={Login}/>
              <Route path='/add'  component={AddQuestion}/>
              <Route path='/questions/:question_id'  component={QuestionDetail}/>
           </div>}
          </div>
        </Fragment>
      </Router> 
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    loading: users.length === 0
  }
}

export default connect(mapStateToProps)(App);
