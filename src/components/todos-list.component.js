import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {server_address} from '../env.js';

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>
    </tr>
)

class TodosList extends Component {
    constructor(props) {
        super(props);
        this.state = {todos: []};
        const server_address_ = process.env.SERVER_URI || 'localhost';
        console.log('process.env.SERVER_URI: ', process.env.SERVER_URI);
        console.log("process.env.SERVER_URI || 'localhost': ", process.env.SERVER_URI || 'localhost');
        console.log('server_address_: ', server_address_);
    }

    componentDidMount() {
        axios.get('http://' + server_address + ':4000/todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    todoList() {
        return this.state.todos.map((currentTodo, i) =>
            <Todo todo={currentTodo} key={i} />
        );
    }

    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TodosList;