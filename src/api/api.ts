import axios, {AxiosRequestConfig} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '6aea3990-cfbe-4637-925f-a2fbc8456a85'
    }
})

type ResponseType<T = {}> = {
    resultCode: number,
    fieldErrors: string[],
    messages: string[],
    data: T
}

type TodolistType = {
    "id": string,
    "title": string,
    "addedDate": string,
    "order": number
}

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('/todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('/todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(title: string, todolistId: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title})
    }
}