import React, {ChangeEvent, useState} from "react";
import {TaskType} from "./module/tasks-reducer";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";

type TodolistPropsType = {
	tasks: TaskType[]
	title: string
	removeTask: (todolistID: string, taskID: string) => void
	addTask: (title: string, todolistID: string) => void
	todolistID: string
	removeTodolist: (todolistID: string) => void
	changeTodolistTitle: (todolistID: string, title: string) => void
	changeTaskTitle:(todolistID: string, taskID: string, title: string) => void
	changeTaskStatus:(todolistID: string, taskID: string, newTitle: boolean) => void
}

type FilterValueType = 'all' | 'active' | 'completed'


export const Todolist = ({todolistID, tasks, title, removeTask, addTask, changeTaskTitle, changeTaskStatus, removeTodolist, changeTodolistTitle}: TodolistPropsType) => {
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
		addTask(title, todolistID)
	}

	const removeTodolistHandler = () => {
		removeTodolist(todolistID)
	}

	const changeTodolistTitleHandler = (title: string) => {
		changeTodolistTitle(todolistID, title)
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
					removeTask(todolistID, t.id)
				}

				const changeTaskTitleHandler = (title: string) => {
					changeTaskTitle(todolistID, t.id, title)
				}

				const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
					let newIsDoneValue = e.currentTarget.checked;
					changeTaskStatus(todolistID, t.id, newIsDoneValue)
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


