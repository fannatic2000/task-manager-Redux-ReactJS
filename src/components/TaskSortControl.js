import { Component } from "react";
import { connect } from 'react-redux'
import * as actions from '../actions'

class TaskSortControl extends Component {


    handleClick = (sortBy, sortValue) => {
        this.props.onSort({
            by: sortBy,
            value: sortValue
        });
    }

    isChecked = (by, value) => {
        return (by === this.props.sort.by && value === this.props.sort.value) ? 'sort_selected' : '';
    }

    render() {
        return (
            <div className="btn-group">
                <button
                    type="button"
                    className="btn btn-primary dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Sắp xếp <span className="caret ml-5"></span>
                </button>
                <ul className="dropdown-menu">
                    <li
                        onClick={(e) => this.handleClick('name', 1)}
                    >
                        <a role="button" href className={this.isChecked('name', 1)} >
                            <span className="fas fa-sort-alpha-asc mr-5">
                            </span> Tên A-Z
                        </a>
                    </li>
                    <li
                        onClick={(e) => this.handleClick('name', -1)}
                    ><a role="button" href  className={this.isChecked('name', -1)}>
                            <span className="fas fa-sort-alpha-desc mr-5">
                            </span>Tên Z-A</a></li>
                    <li role="separator" className="divider"></li>
                    <li
                        onClick={(e) => this.handleClick('status', 1)}
                    ><a role="button" href  className={this.isChecked('status', 1)}>Trạng thái kích hoạt</a></li>
                    <li
                        onClick={(e) => this.handleClick('status', -1)}
                    ><a role="button" href className={this.isChecked('status', -1)}>Trạng thái ẩn</a></li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sort: state.sort,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSort: (sort) => {
            dispatch(actions.sortTask(sort))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskSortControl);