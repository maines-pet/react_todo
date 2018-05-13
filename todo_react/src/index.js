import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ToDoElement {
	constructor(description, isCompleted){
		this.description = description;
		this.isCompleted = isCompleted;
	}
}

class ToDo extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			toDoList : []
		}
		this.handleButtonClick = this.handleButtonClick.bind(this);
	}

	handleButtonClick(todo){
		this.setState({toDoList : this.state.toDoList.concat([new ToDoElement(todo.inputText, todo.completed)])});
	}

	render(){
		return(
		<div className="main">
			<div className="header">todo</div>
			<CreateToDoForm onButtonClick = {this.handleButtonClick}/>
			<ToDoList toDoList = {this.state.toDoList}/>
		</div>
	);
	}
}

class CreateToDoForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			inputText : '',
			inputCompleted : false
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleButtonClick = this.handleButtonClick.bind(this);
	}

	handleChange(event){
		this.setState({inputText : event.target.value});
	}

	handleButtonClick(e){
		this.props.onButtonClick(this.state);
	}

	render(){
		return(
  			<div className="searchForm">
        		<input type='text' placeholder="what's need to be done?" onChange={this.handleChange} value={this.state.inputText}/>
        		<button onClick={this.handleButtonClick}>{">"}</button>
      		</div>
    	);
  }
}

class ToDoList extends React.Component{


  render(){
    const taskList = this.props.toDoList.map((elem, index) =>{
      return <ToDoDetails key = {index} taskDetail = {elem}/>
    });
    
    return(
      <div>
        <ul>
          {taskList}
        </ul>
      </div>
    );
  }
}

class ToDoDetails extends React.Component{
	constructor(props){
		super(props);
		this.handleCheckBox = this.handleCheckBox.bind(this);
	}

	handleCheckBox(event){
		this.props.onCheck
	}

	render(){
		console.log(this.props.taskDetail);
		const task = this.props.taskDetail;
		return(
		<React.Fragment>
			<li>
					<i className={'checkbox-complete ' + (task.isCompleted ? 'far fa-check-square' : 'far fa-square')}
						onClick=
					/>
					<span className='taks-detail'>{task.description}</span>
					<span className='delete'>x</span>
				</li>
			</React.Fragment>
		);
	}
}

const TASKS = [
    {task: 'wash clothes', completed: true},
    {task: 'clean dirty dishes', completed: false},
    {task: 'wipe the floor', completed: false}
  ];

ReactDOM.render(
  <ToDo/>,
  document.getElementById("root")
);