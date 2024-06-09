import React, {ChangeEvent, useCallback} from "react";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, TaskType} from "./module/tasks-reducer";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./module/store";
import {ChangeTodolistFilterAC, RemoveTodolistAC, TodolistType, UpdateTodolistAC} from "./module/todolists-reducer";
import {Task} from "./Task";

type TodolistPropsType = {
	todolist: TodolistType
}

export const TodolistWithRedux = React.memo(({ todolist }: TodolistPropsType) => {
	console.log("Todolist called")

	const {id, title, filter} = todolist

	const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])

	const dispatch = useDispatch()

	const addTaskHandler = useCallback((title: string) => {
		dispatch(AddTaskAC(title, id))
	}, [])

	const removeTodolistHandler = useCallback(() => {
		dispatch(RemoveTodolistAC(id))
	},[])

	const changeTodolistTitleHandler = useCallback((title: string) => {
		dispatch(UpdateTodolistAC(id, title))
	},[]);

	const onAllClickHandler = useCallback(() => {
		dispatch(ChangeTodolistFilterAC(id, 'all'))
	}, [])

	const onActiveClickHandler = useCallback(() => {
		dispatch(ChangeTodolistFilterAC(id, 'active'))
	}, [])

	const onCompletedClickHandler = useCallback(() => {
		dispatch(ChangeTodolistFilterAC(id, 'completed'))
	}, [])

	let tasksForTodolist = tasks

	if (filter === 'active') {
		tasksForTodolist = tasks.filter(f => !f.isDone)
	}

	if (filter === 'completed') {
		tasksForTodolist = tasks.filter(f => f.isDone)
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

				return (
					<div key={t.id}>
						<Task todolistID={id}
							  taskID={t.id}
							  isDone={t.isDone}
							  title={t.title}
						/>
					</div>
				)
			})
			}
			<div>
				<Button onClick={onAllClickHandler}
						color={'inherit'}
						variant={filter === 'all' ? 'outlined' : 'text'}
				>All</Button>
				<Button onClick={onActiveClickHandler}
						color={'primary'}
						variant={filter === 'active' ? 'outlined' : 'text'}
				>Active</Button>
				<Button onClick={onCompletedClickHandler}
						color={'secondary'}
						variant={filter === 'completed' ? 'outlined' : 'text'}
				>Completed</Button>
			</div>
		</div>
	)
})




// зачем redux
// flux архитектура
// объект store
// принципы redux
// как библиотека react с redux связываются
// хуки useSelector и useDispatch