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
			toDoList : []
		}
		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.handleCheckBox = this.handleCheckBox.bind(this);
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

	render(){
		return(
		<div className="main">
			<div className="header">todo</div>
			<CreateToDoForm onButtonClick = {this.handleButtonClick} />
			<ToDoList toDoList = {this.state.toDoList} onCheckBoxChange={this.handleCheckBox}/>
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
	constructor(props){
		super(props);
		this.handleCheckBoxChanges = this.handleCheckBoxChanges.bind(this);
	}

	handleCheckBoxChanges(index){
		this.props.onCheckBoxChange(index);
	}


  render(){
    const taskList = this.props.toDoList.map((elem, index) =>{
      return <ToDoDetails  taskDetail={elem} key={elem.sequenceId} index={elem.sequenceId} onCheckBoxClick={this.handleCheckBoxChanges}/>
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
		this.props.onCheckBoxClick(this.props.index);
	}

	render(){
		const task = this.props.taskDetail;
		return(
		<React.Fragment>
			<li>
				<i className={'checkbox-complete ' + (task.isCompleted ? 'far fa-check-square' : 'far fa-square')}
					onClick={this.handleCheckBox}
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