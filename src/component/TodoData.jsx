import React from 'react';
import { Box, Button, useDisclosure } from '@chakra-ui/react';
import EditTodo from './modal/EditTodo';

const TodoData = ({ todo, index, handleDeleteTask, updateTodoList }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateTask = updatedTodo => {
    updateTodoList(updatedTodo, index);
  };

  return (
    <Box key={index}>
      <Box>
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
        <p>Category: {todo.category}</p>
        <p>Deadline: {todo.deadline}</p>
        <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>{' '}
        <Button onClick={() => handleDeleteTask(index)}>Delete</Button>
        <Button onClick={onOpen}>Edit</Button>
      </Box>
      <EditTodo
        isOpen={isOpen}
        onClose={onClose}
        updateTask={updateTask}
        todo={todo}
      />
    </Box>
  );
};

export default TodoData;

