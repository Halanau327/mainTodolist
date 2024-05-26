import {Button} from "./Button";
import {ChangeEvent ,KeyboardEvent, useState} from "react";


type AddItemFormPropsType = {
    addItem: ( title:string) => void

};

export const AddItemForm = ({addItem}: AddItemFormPropsType) => {
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

    const addItemOnKeyUpHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div>
            <input onChange={onChangeItemHandler}
                   onKeyUp={addItemOnKeyUpHandler}
                   value={title}/>

            <Button title={'+'} onClick={addItemHandler}/>
        </div>
    );
};