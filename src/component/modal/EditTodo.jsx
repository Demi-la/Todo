import React, { useState, useEffect } from 'react';
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
  Textarea,
  Select,
  useToast,
  Input
} from '@chakra-ui/react';

const EditTodo = ({ isOpen, onClose, updateTask, todo }) => {
  const toast = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');
  

  useEffect(() => {
    setTitle(todo.title);
    setDescription(todo.description);
    setCategory(todo.category);
    setDeadline(todo.deadline);
  }, [todo]);

  const handleUpdate = e => {
    e.preventDefault();
    const updatedTodo = {
      ...todo,
      title,
      description,
      category,
      deadline,
    };
   toast({
     title: 'Task updated successfully!',
     status: 'success',
     duration: 2000,
     isClosable: true,
     position: 'top-right',
   });

    updateTask(updatedTodo);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleUpdate}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  isReadOnly
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
              <ModalFooter gap={'2rem'}>
                <Button type="submit">Update Task</Button>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditTodo;
