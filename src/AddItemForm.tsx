import React, {ChangeEvent ,KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";


type AddItemFormPropsType = {
    addItem: ( title:string) => void

};

export const AddItemForm = React.memo(({addItem}: AddItemFormPropsType) => {
    console.log('AddItemFormCalled')
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addItemOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }

    return <div>
        <TextField onChange={onChangeItemHandler}
                   onKeyUp={addItemOnKeyUpHandler}
                   value={title}
                   error={!!error}
                   helperText={error}
                   variant="outlined"
                   label="Title"
        />

        <IconButton color="primary" onClick={addItemHandler}>
            <AddBox/>
        </IconButton>
    </div>
});