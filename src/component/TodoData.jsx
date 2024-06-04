import React,{useState} from 'react';
import { Box, useDisclosure, Text, Flex, Checkbox } from '@chakra-ui/react';
import EditTodo from './modal/EditTodo';
import { MdDelete } from 'react-icons/md';
import { RiEdit2Fill } from 'react-icons/ri';
import ConfirmationModal from './modal/ConfirmationModal';
const TodoData = ({
  todo,
  index,
  handleDeleteTask,
  updateTodoList,
  handleToggleTask,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const updateTask = updatedTodo => {
    updateTodoList(updatedTodo, index);
  };

    const openConfirmation = () => {
      setIsConfirmationOpen(true);
    };

    const closeConfirmation = () => {
      setIsConfirmationOpen(false);
    };

    const handleConfirmDelete = () => {
      handleDeleteTask(index);
      closeConfirmation();
    };
  const getCategoryBackgroundColor = category => {
    switch (category) {
      case 'Work':
        return '#ff9999';
      case 'Personal':
        return '#99ccff';
      case 'Health':
        return 'green';
      case 'Family':
        return '#ffc266';
      case 'Finance':
        return '#ffff99';
      default:
        return '#bfa3a3';
    }
  };

  const getDeadlineBackgroundColor = deadline => {
    switch (deadline) {
      case 'Passed':
        return '#ff9999';
      case 'Today':
        return '#E5E4E2';
      case 'Tomorrow':
        return '#ffff99';
      default:
        return '#bfa3a3';
    }
  };
  

  return (
    <Box key={index} width={'100%'} overflow={'hidden'}>
      <Box
        width={{ base: '90%', lg: '35%' }}
        margin={'auto'}
        background={'white'}
        border={'1px solid rgba(0, 0, 0, 0.11)'}
        mt={'2rem'}
      >
        <Box
          padding={'1rem 2rem'}
          color={'#352121'}
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          position={'relative'}
        >
          <Text
            fontWeight={'600'}
            fontSize={'1.3rem'}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}
          >
            {todo.title}
          </Text>
          <Flex
            gap={{ base: '3rem', lg: '2rem' }}
            mt={'1rem'}
            position={'relative'}
          >
            <Text
              fontSize={'0.8rem'}
              fontWeight={'500'}
              width={{ base: '80%', lg: '85%' }}
            >
              {todo.description}
            </Text>
            <Box position={'absolute'} right={'1.5rem'}>
              <Checkbox
                isChecked={todo.completed}
                onChange={() => handleToggleTask(index)}
              ></Checkbox>
            </Box>
          </Flex>
          <Flex gap={'1rem'} mt={'2rem'} fontSize={'14px'}>
            {todo.category && (
              <Text
                background={getCategoryBackgroundColor(todo.category)}
                minWidth={{ base: '25%', lg: '20%' }}
                p={{ base: '0.3rem', lg: '0.3rem' }}
                borderRadius={'2rem'}
                textAlign={'center'}
                color={'white'}
              >
                {todo.category}
              </Text>
            )}

            {todo.deadline && (
              <Text
                background={getDeadlineBackgroundColor(todo.deadline)}
                minWidth={{ base: '25%', lg: '20%' }}
                p={'0.3rem'}
                borderRadius={'2rem'}
                textAlign={'center'}
              >
                {todo.deadline}
              </Text>
            )}
          </Flex>
          <Flex
            fontSize={'1.5rem'}
            gap={'1rem'}
            position={'absolute'}
            right={'1rem'}
            bottom={'1rem'}
          >
            <Box color={'#C41E3A'} onClick={openConfirmation}>
              <MdDelete />
            </Box>
            <Box onClick={onOpen} color={'#228B22'}>
              <RiEdit2Fill />
            </Box>
          </Flex>
        </Box>
      </Box>
      <EditTodo
        isOpen={isOpen}
        onClose={onClose}
        updateTask={updateTask}
        todo={todo}
      />
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={closeConfirmation}
        onConfirm={handleConfirmDelete}
        handleDeleteTask={handleDeleteTask}
      />
    </Box>
  );
};

export default TodoData;
