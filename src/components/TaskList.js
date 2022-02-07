import { Component } from "react";
import { connect } from 'react-redux'
import * as actions from '../actions'

import TaskItem from "./TaskItem";

class TaskList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterName: '',
            filterStatus: -1 // -1: all, 1:active, 0:deactive
        }
    }

    handleChange = (e) => {
        let target = e.target;

        let value = target.name === 'filterStatus' ? +target.value : target.value;

        this.props.onFilter({
            name: target.name === 'filterName' ? value : this.state.filterName,
            status: target.name === 'filterStatus' ? value : this.state.filterStatus
        })

        this.setState({
            [target.name]: value
        })
    }

    render() {
        const { filterName, filterStatus } = this.state;
        let { filter, taskList, keyword, sort } = this.props;

        // Search Task
        if (keyword) {
            taskList = taskList.filter(task => {
                return task.name.toLowerCase().includes(keyword);
            })
        }

        // Filter on table
        if (filter.name) {
            taskList = taskList.filter(task => {
                return task.name.toLowerCase().includes(filter.name);
            })
        }
        if (filter.status !== -1) {
            taskList = taskList.filter(task => {
                return task.status === !!filter.status;
            })
        }

        // Sort
        switch (sort.by) {
            case 'name':
                taskList.sort((a, b) => {
                    let nameA = a.name.toLowerCase();
                    let nameB = b.name.toLowerCase();

                    if (nameA < nameB) return -sort.value
                    else if (nameA > nameB) return sort.value
                    else return 0;
                })
                break;
            case 'status':
                taskList.sort((a, b) => {
                    if (a.status > b.status) return -sort.value; // <0 : ab
                    else if (a.status < b.status) return sort.value; // >0: ba
                    else return 0;
                })
                break;
            default:
                break;
        }

        // Create Task Item List
        const taskItemList = taskList.map(
            (task, index) =>
                <TaskItem
                    key={task.id}
                    task={task}
                    index={index}
                />
        )


        return (
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Trạng Thái</th>
                                <th className="text-center">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input
                                        type="text"
                                        name="filterName"
                                        className="form-control"
                                        value={filterName}
                                        onChange={this.handleChange}
                                    />
                                </td>
                                <td>
                                    <select
                                        name="filterStatus"
                                        className="form-control"
                                        value={filterStatus}
                                        onChange={this.handleChange}
                                    >
                                        <option value="-1">Tất Cả</option>
                                        <option value="0">Ẩn</option>
                                        <option value="1">Kích Hoạt</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            {taskItemList}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        taskList: state.taskList,
        filter: state.filterTable,
        keyword: state.search,
        sort: state.sort
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilter: (filter) => {
            dispatch(actions.filterTable(filter));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);