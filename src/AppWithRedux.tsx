import React from 'react';
import './App.css';
import {
	AddTaskAC,
	ChangeTaskStatusAC,
	ChangeTaskTitleAC,
	RemoveTaskAC,
	tasksReducer, TasksStateType
} from "./module/tasks-reducer";
import {useReducer} from "react";
import {v1} from "uuid";
import {Todolist} from "./Todolist";
import {
	AddTodolistAC,
	RemoveTodolistAC,
	todolistsReducer, TodolistType,
	UpdateTodolistAC
} from "./module/todolists-reducer";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./module/store";


function AppWithRedux() {

	let todolistID1 = v1()
	let todolistID2 = v1()


	let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

	let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

	const dispatch = useDispatch()

	const removeTask = (todolistID: string, taskID: string) => {
		dispatch(RemoveTaskAC(todolistID, taskID))
	}

	const addTask = (title: string, todolistID: string) => {
		dispatch(AddTaskAC(title, todolistID))
	}

	const changeTaskTitle = (todolistID: string, taskID: string, title: string) => {
		const action = ChangeTaskTitleAC(todolistID, taskID, title)
		dispatch(action)
	}

	const changeTaskStatus = (todolistID: string, taskID: string, taskStatus: boolean) => {
		const action = ChangeTaskStatusAC(todolistID, taskID, taskStatus)
		dispatch(action)
	}


	const removeTodolist = (todolistID: string) => {
		dispatch(RemoveTodolistAC(todolistID));
	}

	const addTodolist = (title: string) => {
		dispatch(AddTodolistAC(title));

	};

	const changeTodolistTitle = (todolistID: string, title: string) => {
		const action = UpdateTodolistAC(todolistID, title)
			dispatch(action)
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

						return <Grid key={tl.id} item>
							<Paper style={{padding: "10px"}}>
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
							</Paper>
						</Grid>
					})
					}
				</Grid>
			</Container>
		</div>
	);
}

export default AppWithRedux;
