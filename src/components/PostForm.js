import React from "react";
import {connect} from "react-redux";
import {createPost} from '../redux/actions'

class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            prioritySelect: '0',
            statusSelect: '0',
            priorities: [
                {name: 'Highly', value: 3},
                {name: 'Normal', value: 2},
                {name: 'Low', value: 1}
            ],
            statuses: [
                {name: 'Inprogress', value: 2},
                {name: 'Done', value: 3},
                {name: 'Open', value: 1}
            ]
        };

    }

    submitHandler = (event) => {
        event.preventDefault();

        const {title, description, statusSelect, prioritySelect} = this.state;
        if (!title && !description) {
            return
        }
        const newPost = {
            id: Date.now().toString(),
            title,
            description,
            statusSelect,
            prioritySelect
        };
        this.props.createPost(newPost)
    }

    changeInputHandler = (event) => {
        event.persist();
        this.setState((prev) => ({
            ...prev,
            ...{
                [event.target.name]: event.target.value,
            },
        }))
    }
    prioritySelectorHandler = (event) => {
        this.setState({prioritySelect: event.target.value})
    }
    statusSelectorHandler = (event) => {
        this.setState({statusSelect: event.target.value})
    }

    render() {
        const PrioritySelector = this.state.priorities.map((priority) => <option key={priority.value} value={priority.name}>{priority.name}</option>)
        const StatusSelector = this.state.statuses.map((status) => <option  key={status.value} value={status.name}>{status.name}</option>)


        return (
            <form className="post-form" onSubmit={this.submitHandler}>
                <div className="inputs-text">
                    <div className="form-group">
                        <label htmlFor="title"> Title </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            placeholder="title"
                            name="title"
                            value={this.title}
                            onChange={this.changeInputHandler}
                        />
                        <label htmlFor="description pt-2"> Description </label>
                        <textarea className="form-control" onChange={this.changeInputHandler} placeholder="Description"
                                  name="description" id="description" cols="30" rows="10"></textarea>
                    </div>
                </div>
                <div className="selectors-options">
                    <label className="my-1 mr-2" htmlFor="priority">Priority</label>
                    <select className="custom-select my-1 mr-sm-2" id="priority" onChange={this.prioritySelectorHandler}>
                        {PrioritySelector}
                    </select>
                    <label className="my-1 mr-2" htmlFor="status">Status</label>
                    <select className="custom-select my-1 mr-sm-2" id="status" onChange={this.statusSelectorHandler}>
                        {StatusSelector}
                    </select>
                </div>
                <button className="btn btn-success send-post" type="submit">
                    Создать
                </button>
            </form>
        );
    }
}

const mapDispatchToProps = {
    createPost
}

export default connect(null, mapDispatchToProps)(PostForm)