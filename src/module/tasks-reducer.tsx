import {v1} from "uuid";
import {addTodolistType, removeTodolistType} from "./todolists-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key:string]: TaskType[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: tasksReducerActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            // return state.filter(t => t.id !== action.payload.id)
            const todolistID = action.payload.todolistID
            return {...state, [todolistID]: state[todolistID].filter(t => t.id !== action.payload.taskID) }
        }

        case 'ADD-TASK': {
            const newTask = {id: v1(),title: action.payload.title, isDone: false}
            const todolistID = action.payload.todolistID
            return {...state, [todolistID]: [newTask, ...state[todolistID]]}
        }

        case 'CHANGE-TITLE-STATUS': {
            const todolistID = action.payload.todolistID
            const title = action.payload.title
            return {...state, [todolistID]: state[todolistID].map(t => t.id === action.payload.taskID ? {...t, title}: t)}
        }

        case 'CHANGE-TASK-STATUS': {
            const todolistID = action.payload.todolistID
            return {...state, [todolistID]: state[todolistID].map(t => t.id === action.payload.taskID ? {...t, isDone: action.payload.taskStatus }: t) }
        }

        case "ADD-TODOLIST": {
            return {...state, [action.payload.todolistID]: []}
        }

        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.payload.todolistID]
            return copyState
        }

        default: {
            return state
        }
    }
}

type tasksReducerActionsType = removeTaskType | addTaskType | changeTitleStatusType | changeTaskStatus| addTodolistType | removeTodolistType



type removeTaskType = {
    type: 'REMOVE-TASK'
    payload: {
        todolistID: string
        taskID: string
    }
}

type addTaskType = {
    type: 'ADD-TASK'
    payload: {
        todolistID: string
        title: string
    }
}

type changeTitleStatusType = {
    type: 'CHANGE-TITLE-STATUS'
    payload: {
        todolistID: string
        taskID: string
        title: string
    }
}

type changeTaskStatus = {
    type: 'CHANGE-TASK-STATUS',
    payload: {
        todolistID: string
        taskID: string
        taskStatus: boolean
    }
}


export const RemoveTaskAC = (todolistID: string,taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistID,
            taskID
        }
    } as const
}

export const AddTaskAC = (title: string, todolistID: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            todolistID
        }
    } as const
}

export const ChangeTaskTitleAC = (todolistID: string, taskID: string, title: string) => {
    return {
        type: 'CHANGE-TITLE-STATUS',
        payload: {
            todolistID,
            taskID,
            title
        }
    } as const
}

export const ChangeTaskStatusAC = (todolistID: string, taskID: string, taskStatus: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistID,
            taskID,
            taskStatus
        }
    } as const
}