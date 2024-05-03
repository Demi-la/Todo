import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast
} from '@chakra-ui/react';


const AddTodo = ({ isOpen, onClose, addTask }) => {
  const toast = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');

    const isFieldEmpty = field => {
      return !field || field.trim() === '';
    };

  const handleSubmit = e => {
    e.preventDefault();
       if (
         isFieldEmpty(title) ||
         isFieldEmpty(description) ||
         isFieldEmpty(deadline)
       ) {
         toast({
           title: 'Error',
           description: 'Please fill in all required fields.',
           status: 'error',
           duration: 3000,
           isClosable: true,
           position: 'top-right',
         });
         return; 
       }

    const newTask = {
      title: title,
      description: description,
      category: category,
      deadline: deadline,
      completed: false,
    };
    addTask(newTask);
    setTitle('');
    setDescription('');
    setCategory('');
    setDeadline('');

    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Todo</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel mt={'1rem'}>Title</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                <FormLabel mt={'1rem'}>Description</FormLabel>
                <Textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
                <FormLabel mt={'1rem'}>Category</FormLabel>
                <Select
                  placeholder="Select option"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Health">Health</option>
                  <option value="Family">Family</option>
                  <option value="Finance">Finance</option>
                </Select>
                <FormLabel mt={'1rem'}>Deadline</FormLabel>
                <Select
                  placeholder="Select option"
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                >
                  <option value="Passed">Passed</option>
                  <option value="Today">Today</option>
                  <option value="Tomorrow">Tomorrow</option>
                </Select>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter gap={'2rem'}>
            <Button type="submit" onClick={handleSubmit}>
              Add Todo
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTodo;
