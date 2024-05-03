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
import { IoIosSearch } from 'react-icons/io';

const getTodos = localStorage.getItem('todos');
const TodoList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [deadlineFilter, setDeadlineFilter] = useState('All');
  const [todos, setTodos] = useState(JSON.parse(getTodos) || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(2);

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
    setCurrentPage(1);
  };

  const handleDeadlineFilterChange = value => {
    setDeadlineFilter(value);
    setCurrentPage(1);
  };

  const handleSearchChange = value => {
    setSearchTerm(value);
    //  setCurrentPage(1);
  };

  const filterTodos = () => {
    return todos.filter(todo => {
      const categoryMatch =
        categoryFilter === 'All' || todo.category === categoryFilter;
      const deadlineMatch =
        deadlineFilter === 'All' || todo.deadline === deadlineFilter;
      const searchMatch =
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && deadlineMatch && searchMatch;
    });
  };

  const getPaginatedTodos = () => {
    const filtered = filterTodos();
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    return filtered.slice(indexOfFirstTodo, indexOfLastTodo);
  };

  const getTotalPages = () => {
    return Math.ceil(filterTodos().length / todosPerPage);
  };

  const nextPage = () => {
    if (currentPage < getTotalPages()) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
          <Box position={'relative'}>
            <Input
              placeholder="search"
              onChange={e => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <Box
              position={'absolute'}
              right={'0'}
              top={'0.7rem'}
              fontSize={'1.3rem'}
              pr={'0.6rem'}
            >
              <IoIosSearch />
            </Box>
          </Box>
          <Button onClick={onOpen}>Add Task</Button>
          <AddTodo isOpen={isOpen} onClose={onClose} addTask={addTask} />
        </Flex>
      </Flex>

      <Box>
        {getPaginatedTodos().map((todo, index) => (
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
      <Flex justifyContent="center" mt={'2rem'} gap={'1rem'}>
        <Button
          onClick={prevPage}
          disabled={currentPage === 1}
          colorScheme={currentPage === 1 ? 'gray' : 'teal'}
          mx={1}
        >
          Previous
        </Button>
        {Array.from({ length: getTotalPages() }, (_, index) => (
          <Button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            variant={currentPage === index + 1 ? 'solid' : 'outline'}
            colorScheme={currentPage === index + 1 ? 'teal' : 'gray'}
            mx={1}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          onClick={nextPage}
          disabled={currentPage === getTotalPages()}
          colorScheme={currentPage === 1 ? 'teal' : 'gray'}
          mx={1}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default TodoList;
