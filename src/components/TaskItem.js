import { Component } from "react";
import { connect } from 'react-redux'
import * as actions from '../actions'

class TaskItem extends Component {
    
    handleDeleteTask = (id) => {
        this.props.onDeleteTask(id);
        this.props.onCloseForm();
    }

    handleUpdateTask = (task) => {
        this.props.onOpenForm();
        this.props.onEditTask(task);
    }

    handleUpdateStatus = (task) => {
        this.props.onUpdateStatus(task.id);
        const editTask = this.props.editTask;
        if (editTask.id && editTask.id === task.id) {
            this.props.onEditTask(task);
        }
    }

    render() {
        const { task, index } = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span
                        id="task-status"
                        className={`label ${task.status ? 'label-danger' : 'label-success'}`}
                        onClick={() => this.handleUpdateStatus(task)}
                    >
                        {task.status ? 'Kích hoạt' : 'Ẩn'}
                    </span>
                </td>
                <td className="text-center">
                    <button onClick={() => this.handleUpdateTask(task)} type="button" className="btn btn-warning">
                        <span className="fas fa-pencil mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button onClick={() => this.handleDeleteTask(task.id)} type="button" className="btn btn-danger">
                        <span
                            className="fas fa-trash mr-5"
                        ></span>Xóa
                    </button>
                </td>
            </tr>
        )
    }
}

const mapStateToProps = state => {
    return {
        editTask: state.itemEditing,
    }
}


const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatus(id));
        },
        onDeleteTask: (id) => {
            dispatch(actions.deleteTask(id));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        },
        onEditTask: (task) => {
            dispatch(actions.editTask(task));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);




