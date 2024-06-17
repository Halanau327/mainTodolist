import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {action} from '@storybook/addon-actions'
import {AddItemFormPropsType} from "../AddItemForm";

import {AddItemForm} from "../AddItemForm";
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

