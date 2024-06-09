import React from 'react';
import {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(({value, onChange}:EditableSpanPropsType) => {
    console.log('EditableSpan Called')
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(value)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(value)
    }

    const activateViewMode = () => {
        setEditMode(false)
        onChange(title)
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode ? <TextField variant="outlined"
                                 value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/> : <span onDoubleClick={activateEditMode}>{value}</span>
})