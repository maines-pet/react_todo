import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ToDoElement {
	constructor(sequenceId, description, isCompleted){
		this.sequenceId = sequenceId;
		this.description = description;
		this.isCompleted = isCompleted;
	}
}

class ToDo extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			toDoList : [],
			toDoListSorted : [],
			isSortedDisplay : false
		}
		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.handleCheckBox = this.handleCheckBox.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.handleSortClick = this.handleSortClick.bind(this);
	}

	handleButtonClick(todo){
		this.setState({toDoList : this.state.toDoList.concat([new ToDoElement(this.state.toDoList.length, todo.inputText, todo.inputCompleted)])});
	}

	handleCheckBox(i){
		let todo = this.state.toDoList.map((elem, index) => {
			if (elem.sequenceId === i) {
				elem.isCompleted = !elem.isCompleted;
			}
			return elem;
		});
		this.setState(function(prev, props){
				return {toDoList : todo}
		});
	}

	handleDeleteClick(i){
		const todo = this.state.toDoList.filter((elem, index) => {
			return elem.sequenceId !== i;
		});
		this.setState({toDoList : todo});
	}

	handleSortClick(todo){
		this.setState((prev, props) => {
			return {toDoListSorted : todo, isSortedDisplay: !prev.isSortedDisplay}
		});
	}

	render(){
		const toDoList = this.state.toDoListSorted.length === 0 ? this.state.toDoList : this.state.toDoListSorted;

		const taskList = toDoList.map((elem, index) =>{
			return <ToDoList taskDetail={elem} key={elem.sequenceId} index={elem.sequenceId}
			onCheckBoxClick={this.handleCheckBox} onDeleteClick={this.handleDeleteClick}/>
		});

		return(
		<div className="main">
			<div className="header">todo</div>
			<CreateToDoForm onButtonClick = {this.handleButtonClick} />
			<SortToDo shouldSort={!this.state.isSortedDisplay} toSort={this.state.toDoList} onSortClick={this.handleSortClick}/>
			<ul>
				{taskList}
			</ul>

		</div>
	);
	}
}

//Sort by description
const SortToDo = (props) => {
	function handleSortClick(e){
		if (props.shouldSort) {
			return props.onSortClick(props.toSort.concat().sort((a,b) => a.description.localeCompare(b.description)));
		} else {
			return props.onSortClick([]);
		}
	}

	return <p className={"sort-btn " + (!props.shouldSort ? "active-sort" : '')} onClick={handleSortClick}>sort</p>
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
	constructor(props){
		super(props);
		this.handleCheckBox = this.handleCheckBox.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
	}

	handleCheckBox(event){
		this.props.onCheckBoxClick(this.props.index);
	}

	handleDeleteClick(event){
		this.props.onDeleteClick(this.props.index);
	}

	render(){
		const task = this.props.taskDetail;
		return(
		<ul>
			<li>
				<i className={'checkbox-complete ' + (task.isCompleted ? 'far fa-check-square' : 'far fa-square')}
					onClick={this.handleCheckBox}
				/>
				<span className='taks-detail'>{task.description}</span>
				<span className='delete' onClick={this.handleDeleteClick}>x</span>
			</li>
		</ul>
		);
	}
}

const TASKS = [new ToDoElement(0, 'wash clothes', true), new ToDoElement(1,'clean dirty dishes' , false)
  ];

ReactDOM.render(
  <ToDo/>,
  document.getElementById("root")
);