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
import {TodolistWithRedux} from "./TodolistWithRedux";


function AppWithRedux() {
	let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

	const dispatch = useDispatch()

	const addTodolist = (title: string) => {
		dispatch(AddTodolistAC(title));
	};

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
								<TodolistWithRedux todolist={tl}/>
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
