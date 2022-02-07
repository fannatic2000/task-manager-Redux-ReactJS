import { Component } from "react";
import { connect } from 'react-redux'
import * as actions from '../actions'

class TaskSearchControl extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keyword: '',
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSearch = () => {
        this.props.onSearch(this.state.keyword)
    }

    render() {
        return (
            <div className="input-group">
                <input
                    name="keyword"
                    type="text"
                    className="form-control"
                    placeholder="Nhập từ khóa..."
                    value={this.state.keyword}
                    onChange={this.handleChange}
                />
                <span className="input-group-btn">
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={this.handleSearch}
                    >
                        <span className="fas fa-search mr-5"></span>Tìm
                    </button>
                </span>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSearch: (keyword) => {
            dispatch(actions.searchTask(keyword))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskSearchControl);