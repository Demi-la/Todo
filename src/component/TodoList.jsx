import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, useDisclosure,useToast } from '@chakra-ui/react';
import TodoData from './TodoData';
import Navbar from './navbar';

const getTodos = localStorage.getItem('todos');
const TodoList = () => {
   const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [deadlineFilter, setDeadlineFilter] = useState('All');
  const [todos, setTodos] = useState(JSON.parse(getTodos) || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(3);
  

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTask = newTask => {
    const addNewTodos = [...todos];
    addNewTodos.unshift(newTask);
    setTodos(addNewTodos);

     toast({
       title: 'Task added successfully!',
       status: 'success',
       duration: 2000,
       isClosable: true,
       position: 'top-right',
     });

    onClose(true);
  };


  const handleDeleteTask = index => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
   toast({
     title: 'Task deleted successfully!',
     status: 'warning',
     duration: 2000,
     isClosable: true,
     position: 'top-right',
   });
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
        // console.log('Checkbox value:', updatedTodo.completed);
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
      <Navbar
        handleCategoryFilterChange={handleCategoryFilterChange}
        handleDeadlineFilterChange={handleDeadlineFilterChange}
        setSearchTerm={handleSearchChange}
        searchTerm={searchTerm}
        addTask={addTask}
        isOpen={isOpen}
      />

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
      <Flex justifyContent="center" mt={'2rem'} gap={'1rem'} mb={'2rem'}>
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
