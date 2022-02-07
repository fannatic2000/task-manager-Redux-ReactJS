import { Component } from "react";
import { connect } from 'react-redux'
import * as actions from '../actions'

const DEFAULT_STATE = {
  id: '',
  name: '',
  status: false
}

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  componentDidMount() {
    const taskEditing = this.props.taskEditing;
    if (taskEditing.id) {
      this.setState({
        name: taskEditing.name,
        id: taskEditing.id,
        status: taskEditing.status
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.taskEditing.id) {
      this.setState({
        name: nextProps.taskEditing.name,
        status: nextProps.taskEditing.status,
        id: nextProps.taskEditing.id
      })
    } else if (!nextProps.task) {
      this.setState(DEFAULT_STATE)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onSaveTask(this.state);

    if (this.props.taskEditing.id) {
      this.props.onClearEditTask();
    }

    this.props.onCloseForm();
  }

  handleCloseForm = () => {
    this.props.onCloseForm();
  }

  handleClear = () => {
    if (this.props.taskEditing.id) {
      this.props.onClearEditTask();
    } else {
      this.setState(DEFAULT_STATE)
    }
  }

  render() {
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {this.state.id ? 'Cập Nhật Công Việc' : 'Thêm Công Việc'}
            <span
              id="panel__close-btn"
              className="fas fa-times-circle"
              onClick={() => this.handleCloseForm()}
            ></span>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Tên :</label>
              <input
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
            <label>Trạng Thái :</label>
            <select
              className="form-control"
              required="required"
              value={this.state.status}
              onChange={(e) => this.setState({ status: String(e.target.value) === 'true' ? true : false })}
            >
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning">
                <span className="fas fa-plus mr-5"></span> {this.state.id ? 'Lưu lại' : 'Thêm'}
              </button>&nbsp;
              <button onClick={() => this.handleClear()} type="button" className="btn btn-danger">
                <span className="fas fa-times mr-5"></span>Hủy Bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    taskEditing: state.itemEditing,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSaveTask: (task) => {
      dispatch(actions.saveTask(task))
    },
    onCloseForm: () => {
      dispatch(actions.closeForm())
    },
    onClearEditTask: () => {
      dispatch(actions.clearEditTask())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);