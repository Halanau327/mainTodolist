import './App.css';
import {
	AddTaskAC,
	ChangeTaskStatusAC,
	ChangeTaskTitleAC,
	RemoveTaskAC,
	tasksReducer
} from "./module/tasks-reducer";
import {useReducer} from "react";
import {v1} from "uuid";
import {Todolist} from "./Todolist";
import {
	AddTodolistAC,
	RemoveTodolistAC,
	todolistsReducer,
	UpdateTodolistAC
} from "./module/todolists-reducer";
import {AddItemForm} from "./AddItemForm";




function App() {

	let todolistID1 = v1()
	let todolistID2 = v1()

	let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
		{id: todolistID1, title: 'What to learn'},
		{id: todolistID2, title: 'What to buy'},
	])

	let [tasks, dispatchTasks] = useReducer(tasksReducer, {
		[todolistID1]: [
			{id: v1(), title: 'HTML&CSS', isDone: true},
			{id: v1(), title: 'JS', isDone: true},
			{id: v1(), title: 'ReactJS', isDone: false},
		],
		[todolistID2]: [
			{id: v1(), title: 'Rest API', isDone: true},
			{id: v1(), title: 'GraphQL', isDone: false},
		],
	})

	const removeTask = (todolistID: string, taskID: string) => {
		dispatchTasks(RemoveTaskAC(todolistID, taskID))
	}

	const addTask = (title: string, todolistID: string) => {
		dispatchTasks(AddTaskAC(title, todolistID))
	}

	const changeTaskTitle = (todolistID: string, taskID: string, title: string) => {
		const action = ChangeTaskTitleAC(todolistID, taskID, title)
		dispatchTasks(action)
	}

	const changeTaskStatus = (todolistID: string, taskID: string, taskStatus: boolean) => {
		const action = ChangeTaskStatusAC(todolistID, taskID, taskStatus)
		dispatchTasks(action)
	}


	const removeTodolist = (todolistID: string) => {
		const action = RemoveTodolistAC(todolistID)
		dispatchTodolists(action);
	}

	const addTodolist = (title: string) => {
		const action = AddTodolistAC(title)
		dispatchTasks(action);
		dispatchTodolists(action);
	};

	const changeTodolistTitle = (todolistID: string, title: string) => {
		const action = UpdateTodolistAC(todolistID, title)
			dispatchTodolists(action)
		}


	return (

		<div className="App">
			<AddItemForm addItem={addTodolist}/>


			{todolists.map(tl => {
				return(
					<Todolist
						key={tl.id}
						todolistID={tl.id}
						title={tl.title}
						tasks={tasks[tl.id]}
						removeTask={removeTask}
						addTask={addTask}
						changeTaskTitle={changeTaskTitle}
						changeTaskStatus={changeTaskStatus}
						removeTodolist={removeTodolist}
						changeTodolistTitle={changeTodolistTitle}
					/>
				)
			})}
		</div>
	);
}

export default App;
