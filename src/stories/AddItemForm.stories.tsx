import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";


const meta: Meta<typeof AddItemForm> = {
  title: 'TODOLISTS/AddItemForm',
  component: AddItemForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    addItem: {
      description: 'Button clicked inside form',
    },
  },

  args: {addItem: fn()},
};

export default meta;

type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {
  // args: {
  //   addItem: action('Button clicked inside form')
  // },
};


const AddItemFormWithError = React.memo(({addItem}: AddItemFormPropsType) => {
  console.log('AddItemFormCalled')
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>('Title is required')

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

export const AddItemFormWithErrorStory: Story = {
  render: (args) => <AddItemFormWithError addItem={args.addItem}/>
}
