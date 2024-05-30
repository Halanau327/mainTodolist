import React, {ChangeEvent, useState} from "react";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, TaskType} from "./module/tasks-reducer";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./module/store";
import {RemoveTodolistAC, TodolistType, UpdateTodolistAC} from "./module/todolists-reducer";

type TodolistPropsType = {
	todolist: TodolistType
}

type FilterValueType = 'all' | 'active' | 'completed'


// зачем redux
// flux архитектура
// объект store
// принципы redux
// как библиотека react с redux связываются
// хуки useSelector и useDispatch

export const TodolistWithRedux = ({ todolist }: TodolistPropsType) => {

	const {id, title} = todolist


	const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])

	const dispatch = useDispatch()

	const [filter, setFilter] = useState<FilterValueType>('all')

	let tasksForTodolist = tasks

	if (filter === 'active') {
		tasksForTodolist = tasks.filter(f => !f.isDone)
	}

	if (filter === 'completed') {
		tasksForTodolist = tasks.filter(f => f.isDone)
	}

	const changeFilterTasksHandler = (filter: FilterValueType) => {
		setFilter(filter)
	}

	const addTaskHandler = (title: string) => {
		dispatch(AddTaskAC(title, id))
	}

	const removeTodolistHandler = () => {
		dispatch(RemoveTodolistAC(id))
	}

	const changeTodolistTitleHandler = (title: string) => {
		dispatch(UpdateTodolistAC(id, title))
	}

	return (
		<div>
			<div>
				<h3>
					<EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
					<IconButton onClick={removeTodolistHandler}>
						<Delete />
					</IconButton>
				</h3>
				<AddItemForm addItem={addTaskHandler}/>

			</div>
			{tasksForTodolist.map(t => {

				const removeTaskHandler = () => {
					dispatch(RemoveTaskAC(id, t.id))
				}

				const changeTaskTitleHandler = (title: string) => {
					dispatch(ChangeTaskTitleAC(id, t.id, title))
				}

				const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
					let newIsDoneValue = e.currentTarget.checked;
					dispatch(ChangeTaskStatusAC(id, t.id, newIsDoneValue))
				}

				return (
					<div key={t.id}>
						<Checkbox
							checked={t.isDone}
							color="primary"
							onChange={changeTaskStatusHandler}
						/>

						<EditableSpan value={t.title} onChange={changeTaskTitleHandler}/>
						<IconButton onClick={removeTaskHandler}>
							<Delete/>
						</IconButton>
					</div>
				)
			})
			}
			<div>
				<Button onClick={() => changeFilterTasksHandler('all')}
						color={'inherit'}
						variant={filter === 'all' ? 'outlined' : 'text'}
				>All</Button>
				<Button onClick={() => changeFilterTasksHandler('active')}
						color={'primary'}
						variant={filter === 'active' ? 'outlined' : 'text'}
				>Active</Button>
				<Button onClick={() => changeFilterTasksHandler('completed')}
						color={'secondary'}
						variant={filter === 'completed' ? 'outlined' : 'text'}
				>Completed</Button>
			</div>
		</div>
	)
}


