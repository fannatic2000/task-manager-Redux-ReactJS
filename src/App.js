import './App.css';
import { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from './actions'
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';


//import demo from './trainning/demo'

class App extends Component {
  
  handleRenderForm = () => {
    if (this.props.taskEditing.id) {
      this.props.onClearEditTask();
    } else {
      this.props.onToggleForm();
    }
  }

  render() {
    const { isDisplayForm } = this.props;    
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
            {isDisplayForm && <TaskForm/>}
          </div>
          <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.handleRenderForm()}
            >
              <span className="fas fa-plus mr-5"></span>Thêm Công Việc
            </button>
            <TaskControl />
            <TaskList />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isDisplayForm: state.isDisplayForm,
    taskEditing: state.itemEditing
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm())
    },
    onClearEditTask: () => {
      dispatch(actions.clearEditTask())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
