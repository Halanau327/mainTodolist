import {
    AddTodolistAC,
    UpdateTodolistAC,
    RemoveTodolistAC,
    ChangeTodolistFilterAC,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import { TodolistType} from "./todolists-reducer";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

   startState = [
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to buy", filter: 'all'}
    ]
})


test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[2].id).toBeDefined();
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const action = UpdateTodolistAC(todolistId2, newTodolistTitle);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct todolist should change its filter', () => {

    const action = ChangeTodolistFilterAC(todolistId2, "completed");

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe("completed");
});




