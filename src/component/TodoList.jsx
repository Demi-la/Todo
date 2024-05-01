import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import AddTodo from './modal/AddTodo';
import TodoData from './TodoData';

const TodoList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [todos, setTodos] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All'); 
  const [deadlineFilter, setDeadlineFilter] = useState('All'); 
    const [searchTerm, setSearchTerm] = useState('');
  const addTask = newTask => {
    setTodos([...todos, newTask]);
    onClose(true);
  };

  const handleDeleteTask = index => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const updateTodoList = (updatedTodo, index) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = updatedTodo;
    setTodos(updatedTodos);
  };

    const filteredTodos = todos.filter(todo => {
      const categoryMatch =
        categoryFilter === 'All' || todo.category === categoryFilter;
      const deadlineMatch =
        deadlineFilter === 'All' || todo.deadline === deadlineFilter;
      const searchMatch =
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && deadlineMatch && searchMatch;
    });
  return (
    <Box width={'100%'}>
      <Flex justifyContent={'space-between'}>
        <Text>TODOLIST</Text>
        {/* <Text>Category</Text>
        <Input width={'10rem'} placeholder="Search" />
        <Text>Deadline</Text> */}
        <Text>Category</Text>
        {/* Replace Input with Select */}
        <Select
          width={'10rem'}
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="health">Health</option>
          <option value="family">Family</option>
          <option value="finance">Finance</option>
        </Select>
        <Input
          placeholder="search"
          onChange={e => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <Text>Deadline</Text>
        {/* Replace Input with Select */}
        <Select
          width={'10rem'}
          value={deadlineFilter}
          onChange={e => setDeadlineFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="passed">Passed</option>
          <option value="today">Today</option>
          <option value="Tomorrow">Tomorrow</option>
        </Select>
        <Button onClick={onOpen}>Add Task</Button>
        <AddTodo isOpen={isOpen} onClose={onClose} addTask={addTask} />
      </Flex>
      <Box>
        {filteredTodos.map((todo, index) => (
          <TodoData
            key={index}
            index={index}
            todo={todo}
            handleDeleteTask={handleDeleteTask}
            updateTodoList={updateTodoList}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TodoList;

