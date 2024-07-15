import type { Meta, StoryObj } from '@storybook/react';
import React from "react";
import {action} from '@storybook/addon-actions'
import {Task} from "../Task";
import {useState} from "react";


const meta: Meta<typeof Task> = {
  title: 'TODOLISTS/Task',
  component: Task,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    changeTaskStatus: action('Status changed inside Task'),
    changeTaskTitle: action('Title changed inside Task'),
    removeTask: action('Remove Button clicked changed inside Task'),
    task: {id: '12wsdewfijdei', title: 'JS', isDone: false},
    todolistId: 'fgdosrg8rgjuh'
  }

};

export default meta;

type Story = StoryObj<typeof Task>;

export const TaskIsNotDoneStory: Story = {};

export const TaskIsDoneStory: Story = {
  args: {
    task: {id: 'aasasdfasdasd', title: 'HTML', isDone: true},
  },
};

const TaskToggle = () => {
  const [task, setTask] = useState({id: '12wsdewfijdei', title: 'JS', isDone: false})
  const changeTaskStatus = () => {
    setTask({...task, isDone: !task.isDone})
  }

  const changeTaskTitle = (taskId: string, newTitle: string) => {
    setTask({...task, title: newTitle})
  }
  return <Task changeTaskStatus={changeTaskStatus}
               changeTaskTitle={changeTaskTitle}
               removeTask={action('Task delete')}
               task={task}
               todolistId={'asdasdas2'}/>;
}

export const TaskToggleStory: Story = {
  render: () => <TaskToggle/>
}

