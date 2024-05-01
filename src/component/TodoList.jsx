import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import TodoData from './TodoData';
import AddTodo from './modal/AddTodo';

const getTodos = localStorage.getItem('todos');
const TodoList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [deadlineFilter, setDeadlineFilter] = useState('All');
  const [todos, setTodos] = useState(JSON.parse(getTodos) || []);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

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

  const handleToggleTask = index => {
    const newTodos = todos.map((todo, currentIndex) => {
      if (currentIndex === index) {
        const updatedTodo = { ...todo, completed: !todo.completed };
        console.log('Checkbox value:', updatedTodo.completed);
        return updatedTodo;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleCategoryFilterChange = value => {
    setCategoryFilter(value);
  };

  const handleDeadlineFilterChange = value => {
    setDeadlineFilter(value);
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
    <Box width={'100%'} height={'100%'}>
      <Flex
        gap={'30%'}
        background={'#352121'}
        boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
        zIndex={999}
        p={'2rem'}
        color={'white'}
      >
        <Text fontSize={'1.5rem'} fontWeight={'700'}>
          TODO LIST
        </Text>
        <Flex gap={'5rem'}>
          <Menu background={'#352121'}>
            <MenuButton color="white" fontSize={'1.3rem'} fontWeight={'600'}>
              Category <ChevronDownIcon />
            </MenuButton>
            <MenuList color={'white'} background={'#352121'}>
              <MenuItem
                onClick={() => handleCategoryFilterChange('All')}
                background={'#352121'}
              >
                All
              </MenuItem>
              <MenuItem
                onClick={() => handleCategoryFilterChange('Work')}
                background={'#352121'}
              >
                Work
              </MenuItem>
              <MenuItem
                onClick={() => handleCategoryFilterChange('Personal')}
                background={'#352121'}
              >
                Personal
              </MenuItem>
              <MenuItem
                onClick={() => handleCategoryFilterChange('Health')}
                background={'#352121'}
              >
                Health
              </MenuItem>
              <MenuItem
                onClick={() => handleCategoryFilterChange('Family')}
                background={'#352121'}
              >
                Family
              </MenuItem>
              <MenuItem
                onClick={() => handleCategoryFilterChange('Finance')}
                background={'#352121'}
              >
                Finance
              </MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton color="white" fontSize={'1.3rem'} fontWeight={'600'}>
              Deadline <ChevronDownIcon />
            </MenuButton>
            <MenuList color={'black'}>
              <MenuItem onClick={() => handleDeadlineFilterChange('All')}>
                All
              </MenuItem>
              <MenuItem onClick={() => handleDeadlineFilterChange('Passed')}>
                Passed
              </MenuItem>
              <MenuItem onClick={() => handleDeadlineFilterChange('Today')}>
                Today
              </MenuItem>
              <MenuItem onClick={() => handleDeadlineFilterChange('Tomorrow')}>
                Tomorrow
              </MenuItem>
            </MenuList>
          </Menu>
          <Box>
            <Input
              placeholder="search"
              onChange={e => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </Box>
          <Button onClick={onOpen}>Add Task</Button>
          <AddTodo isOpen={isOpen} onClose={onClose} addTask={addTask} />
        </Flex>
      </Flex>

      <Box>
        {filteredTodos.map((todo, index) => (
          <TodoData
            key={index}
            index={index}
            todo={todo}
            handleDeleteTask={handleDeleteTask}
            updateTodoList={updateTodoList}
            handleToggleTask={handleToggleTask}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TodoList;
