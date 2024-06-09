import {ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./module/tasks-reducer";
import React, {ChangeEvent} from "react";
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";

type TaskPropsType = {
    todolistID: string
    taskID: string
    title: string
    isDone: boolean
}


export const Task = React.memo(({todolistID, taskID, title, isDone}:TaskPropsType) => {

    const dispatch = useDispatch()

    const removeTaskHandler = () => {
        dispatch(RemoveTaskAC(todolistID,taskID))
    }

    const changeTaskTitleHandler = (title: string) => {
        dispatch(ChangeTaskTitleAC(todolistID,taskID, title))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(ChangeTaskStatusAC(todolistID,taskID, newIsDoneValue))
    }
    return (
        <>
            <Checkbox
                checked={isDone}
                color="primary"
                onChange={changeTaskStatusHandler}
            />
            <EditableSpan value={title}
                          onChange={changeTaskTitleHandler}/>
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </>
    )
});