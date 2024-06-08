import React from 'react';
import './App.css';
import {
	AddTaskAC,
	ChangeTaskStatusAC,
	ChangeTaskTitleAC,
	RemoveTaskAC,
	tasksReducer, TaskType
} from "./module/tasks-reducer";
import {useReducer} from "react";
import {v1} from "uuid";
import {Todolist} from "./Todolist";
import {
	AddTodolistAC, ChangeTodolistFilterAC,
	RemoveTodolistAC,
	todolistsReducer,
	UpdateTodolistAC
} from "./module/todolists-reducer";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type FilterValuesType = "all" | "active" | "completed";

function AppWithReducers() {

	let todolistID1 = v1()
	let todolistID2 = v1()

	let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
		{id: todolistID1, title: 'What to learn', filter: 'all'},
		{id: todolistID2, title: 'What to buy', filter: 'all'},
	])

	let [tasks, dispatchTasks]  = useReducer(tasksReducer, {
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

	const changeFilter = (todolistID: string, filter: FilterValuesType) => {
		dispatchTodolists(ChangeTodolistFilterAC(todolistID, filter))
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
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<Menu/>
					</IconButton>
					<Typography variant="h6">
						News
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>

			<Container fixed>
				<Grid container style={{padding: "20px"}}>
					<AddItemForm addItem={addTodolist}/>
				</Grid>
				<Grid container spacing={3}>
					{todolists.map(tl => {

						let allTodolistTasks = tasks[tl.id]
						let tasksForTodolist = allTodolistTasks

						if (tl.filter === 'active') {
							tasksForTodolist = allTodolistTasks.filter(f => f.isDone === false)
						}

						if (tl.filter === 'completed') {
							tasksForTodolist = allTodolistTasks.filter(f => f.isDone === true)
						}


						return <Grid key={tl.id} item>
							<Paper style={{padding: "10px"}}>
								<Todolist
									key={tl.id}
									todolistID={tl.id}
									title={tl.title}
									tasks={tasksForTodolist}
									removeTask={removeTask}
									addTask={addTask}
									changeTaskTitle={changeTaskTitle}
									changeTaskStatus={changeTaskStatus}
									removeTodolist={removeTodolist}
									changeTodolistTitle={changeTodolistTitle}
									filter={tl.filter}
									changeFilter={changeFilter}
								/>
							</Paper>
						</Grid>
					})
					}
				</Grid>
			</Container>
		</div>
	);
}

export default AppWithReducers;
