import {ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, TaskType} from "./module/tasks-reducer";
import React, {ChangeEvent} from "react";
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";

type TaskWithReduxPropsType = {
    todolistID: string
    task: TaskType
}


export const TaskWithRedux = React.memo(({todolistID, task}:TaskWithReduxPropsType) => {

    const dispatch = useDispatch()

    const removeTaskHandler = () => {
        dispatch(RemoveTaskAC(todolistID,task.id))
    }

    const changeTaskTitleHandler = (title: string) => {
        dispatch(ChangeTaskTitleAC(todolistID,task.id, title))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(ChangeTaskStatusAC(todolistID,task.id, newIsDoneValue))
    }
    return (
        <>
            <Checkbox
                checked={task.isDone}
                color="primary"
                onChange={changeTaskStatusHandler}
            />
            <EditableSpan value={task.title}
                          onChange={changeTaskTitleHandler}/>
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </>
    )
});