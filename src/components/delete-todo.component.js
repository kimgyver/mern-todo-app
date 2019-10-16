import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import {server_address} from '../env.js';

class DeleteTodo extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };
        console.log(obj);
        axios.post(server_address + '/todos/delete/'+this.props.match.params.id, obj)
            .then(res => {
                console.log(res.data);
                this.props.history.push('/');
            });
    }  

    componentDidMount() {
        axios.get(server_address + '/todos/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_description: response.data.todo_description,
                    todo_responsible: response.data.todo_responsible,
                    todo_priority: response.data.todo_priority,
                    todo_completed: response.data.todo_completed
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <h3 align="center">Delete Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Description: &nbsp;</label>
                        <label>{this.state.todo_description}</label>
                    </div>
                    <div className="form-group">
                        <label>Responsible: &nbsp;</label>
                        <label>{this.state.todo_responsible}</label>
                    </div>
                    <div className="form-group">
                        <label>Priority: &nbsp;</label>
                        <label>{this.state.todo_priority}</label>
                    </div>
                    <div className="form-group">
                        <label>Completed: &nbsp;</label>
                        <label>{this.state.todo_completed}</label>
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Delete Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(DeleteTodo);