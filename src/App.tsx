// import React, {useState} from 'react';
// import './App.css';
// import {TaskType, Todolist} from './Todolist';
// import {v1} from 'uuid';
// import {AddItemForm} from './AddItemForm';
// import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
// import IconButton from "@mui/material/IconButton/IconButton";
// import {Menu} from "@mui/icons-material";
//
//
// export type FilterValuesType = "all" | "active" | "completed";
// export type TodolistType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
//
// export type TasksStateType = {
//     [key: string]: Array<TaskType>
// }
//
//
// function App() {
//     let todolistId1 = v1();
//     let todolistId2 = v1();
//
//     let [todolists, setTodolists] = useState<Array<TodolistType>>([
//         {id: todolistId1, title: "What to learn", filter: "all"},
//         {id: todolistId2, title: "What to buy", filter: "all"}
//     ])
//
//     let [tasks, setTasks] = useState<TasksStateType>({
//         [todolistId1]: [
//             {id: v1(), title: "HTML&CSS", isDone: true},
//             {id: v1(), title: "JS", isDone: true}
//         ],
//         [todolistId2]: [
//             {id: v1(), title: "Milk", isDone: true},
//             {id: v1(), title: "React Book", isDone: true}
//         ]
//     });
//
//
//     function removeTask(id: string, todolistId: string) {
//         //достанем нужный массив по todolistId:
//         let todolistTasks = tasks[todolistId];
//         // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
//         tasks[todolistId] = todolistTasks.filter(t => t.id != id);
//         // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
//         setTasks({...tasks});
//     }
//
//     function addTask(title: string, todolistId: string) {
//         let task = {id: v1(), title: title, isDone: false};
//         //достанем нужный массив по todolistId:
//         let todolistTasks = tasks[todolistId];
//         // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
//         tasks[todolistId] = [task, ...todolistTasks];
//         // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
//         setTasks({...tasks});
//     }
//
//     function changeTaskStatus(todolistId: string, isDone: boolean, id: string ) {
//         //достанем нужный массив по todolistId:
//         let todolistTasks = tasks[todolistId];
//         // найдём нужную таску:
//         let task = todolistTasks.find(t => t.id === id);
//         //изменим таску, если она нашлась
//         if (task) {
//             task.isDone = isDone;
//             // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
//             setTasks({...tasks});
//         }
//     }
//
//     function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
//         //достанем нужный массив по todolistId:
//         let todolistTasks = tasks[todolistId];
//         // найдём нужную таску:
//         let task = todolistTasks.find(t => t.id === id);
//         //изменим таску, если она нашлась
//         if (task) {
//             task.title = newTitle;
//             // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
//             setTasks({...tasks});
//         }
//     }
//
//
//     function changeFilter(value: FilterValuesType, todolistId: string) {
//         let todolist = todolists.find(tl => tl.id === todolistId);
//         if (todolist) {
//             todolist.filter = value;
//             setTodolists([...todolists])
//         }
//     }
//
//     function removeTodolist(id: string) {
//         // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
//         setTodolists(todolists.filter(tl => tl.id != id));
//         // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
//         delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
//         // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
//         setTasks({...tasks});
//     }
//
//     function changeTodolistTitle(id: string, title: string) {
//         // найдём нужный todolist
//         const todolist = todolists.find(tl => tl.id === id);
//         if (todolist) {
//             // если нашёлся - изменим ему заголовок
//             todolist.title = title;
//             setTodolists([...todolists]);
//         }
//     }
//
//     function addTodolist(title: string) {
//         let newTodolistId = v1();
//         let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'};
//         setTodolists([newTodolist, ...todolists]);
//         setTasks({
//             ...tasks,
//             [newTodolistId]: []
//         })
//     }
//
//     return (
//         <div className="App">
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" aria-label="menu">
//                         <Menu />
//                     </IconButton>
//                     <Typography variant="h6">
//                         News
//                     </Typography>
//                     <Button color="inherit">Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed>
//                 <Grid container style={{padding: "20px"}}>
//                     <AddItemForm addItem={addTodolist}/>
//                 </Grid>
//                 <Grid container spacing={3}>
//                     {
//                         todolists.map(tl => {
//                             let allTodolistTasks = tasks[tl.id];
//                             let tasksForTodolist = allTodolistTasks;
//
//                             if (tl.filter === "active") {
//                                 tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
//                             }
//                             if (tl.filter === "completed") {
//                                 tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
//                             }
//
//                             return <Grid key={tl.id} item>
//                                 <Paper style={{padding: "10px"}}>
//                                     <Todolist
//                                         key={tl.id}
//                                         id={tl.id}
//                                         title={tl.title}
//                                         tasks={tasksForTodolist}
//                                         removeTask={removeTask}
//                                         changeFilter={changeFilter}
//                                         addTask={addTask}
//                                         changeTaskStatus={changeTaskStatus}
//                                         filter={tl.filter}
//                                         removeTodolist={removeTodolist}
//                                         changeTaskTitle={changeTaskTitle}
//                                         changeTodolistTitle={changeTodolistTitle}
//                                     />
//                                 </Paper>
//                             </Grid>
//                         })
//                     }
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
//
// export default App;


import React, {useState} from 'react';
import './App.css';
import {
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    tasksReducer
} from "./module/tasks-reducer";
import {useReducer} from "react";
import {v1} from "uuid";
import {Todolist} from "./Todolist";
import {
    AddTodolistAC,
    RemoveTodolistAC,
    todolistsReducer,
    UpdateTodolistAC
} from "./module/todolists-reducer";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";


function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState([
        {id: todolistID1, title: 'What to learn'},
        {id: todolistID2, title: 'What to buy'},
    ])

    let [tasks, setTasks] = useState({
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
        setTasks({...tasks, todolistID: tasks[todolistID].filter(t => t.id !== taskID)})
    }

    const addTask = (title: string, todolistID: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, todolistID: [newTask, ...tasks[todolistID]]})
    }

    const changeTaskTitle = (todolistID: string, taskID: string, title: string) => {
        setTasks({...tasks, todolistID: tasks[todolistID].map(t => t.id === taskID ? {...t, title} : t)})
    }

    const changeTaskStatus = (todolistID: string, taskID: string, taskStatus: boolean) => {
        setTasks({...tasks, todolistID: tasks[todolistID].map(t => t.id === taskID ? {...t, taskStatus} : t)})
    }


    const removeTodolist = (todolistID: string) => {
        const newTodolist = todolists.filter(td => td.id !== todolistID)
        setTodolists(newTodolist)
    }

    const addTodolist = (title: string) => {
        const newTodolist = {id: v1(), title: title}
        setTodolists([newTodolist, ...todolists])
    };

    const changeTodolistTitle = (todolistID: string, title: string) => {
        setTodolists([...todolists, todolists.map(td => td.id === todolistID ? {...td, title} : td)])
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

export default App;
