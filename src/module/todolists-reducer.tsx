import {v1} from "uuid";
import {FilterValuesType} from "../AppWithReducers";


export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state = initialState , action: todolistsReducerActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(t => t.id !== action.payload.todolistID)
        }

        case 'ADD-TODOLIST': {
            return [{id: action.payload.todolistID, title: action.payload.title, filter: 'all'}, ...state]
            // remember to add new array for tasks (think how u can do it)
        }

        case 'UPDATE-TODOLIST': {
            const title = action.payload.title
            return state.map(t => t.id === action.payload.todolistID ? {...t, title}: t)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(t => t.id === action.payload.todolistID ? {...t, filter: action.payload.filter} : t)
        }

        default: {
            return state
        }
    }
}

type todolistsReducerActionsType = removeTodolistType | addTodolistType | updateTodolistType | changeFilterTodolistType


export type removeTodolistType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        todolistID: string
    }
}

export type addTodolistType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
        todolistID: string
    }
}

type updateTodolistType = {
    type: 'UPDATE-TODOLIST'
    payload: {
        todolistID: string
        title: string
    }
}

type changeFilterTodolistType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        todolistID: string
        filter: FilterValuesType
    }
}

export const RemoveTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistID
        }
    }  as const
}

export const AddTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            todolistID: v1(),
        }
    }  as const
}

export const UpdateTodolistAC = (todolistID: string, title: string) => {
    return {
        type: 'UPDATE-TODOLIST',
        payload: {
            todolistID,
            title
        }
    }  as const
}

export const ChangeTodolistFilterAC = (todolistID: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistID,
            filter
        }
    } as const
}

