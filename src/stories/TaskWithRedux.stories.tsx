import type { Meta, StoryObj } from '@storybook/react';
import React, {useEffect} from "react";
import {TaskWithRedux} from "../TaskWithRedux";
import {ReduxStoreProviderDecorator} from "../module/ReduxStoreProviderDecorator";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../module/store";
import {AddTaskAC, TaskType} from "../module/tasks-reducer";
import {v1} from "uuid";


const meta: Meta<typeof TaskWithRedux> = {
  title: 'TODOLISTS/TaskWithRedux',
  component: TaskWithRedux,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator]

};

export default meta;

type Story = StoryObj<typeof TaskWithRedux>;


const Task = () => {
  let task = useSelector<AppRootStateType, TaskType>(state => state.tasks["todolistId1"][0])
  const dispatch = useDispatch()

  useEffect(() => {
    if (!task) {
      task = {id:v1(), title: 'JS', isDone: false}
      dispatch(AddTaskAC('DefaultTask', "todolistId1"))
    }
  }, []);


  return <TaskWithRedux
      task={task}
      todolistID={'asdasdas2'}/>;
}

export const TaskWithReduxStory: Story = {
  render: () => <Task/>
}

