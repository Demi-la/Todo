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
  Input,
  Textarea,
  Select,
} from '@chakra-ui/react';

const EditTodo = ({ isOpen, onClose, updateTask, todo }) => {
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
      description,
      category,
      deadline,
    };
    updateTask(updatedTodo);
    onClose(); 
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Todo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleUpdate}>
            <FormControl>
              {/* <FormLabel>Title</FormLabel>
              <Input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
              /> */}
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Select option"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="health">Health</option>
                <option value="family">Family</option>
                <option value="finance">Finance</option>
              </Select>
              <FormLabel>Deadline</FormLabel>
              <Select
                placeholder="Select option"
                value={deadline}
                onChange={e => setDeadline(e.target.value)}
              >
                <option value="passed">Passed</option>
                <option value="today">Today</option>
                <option value="Tomorrow">Tomorrow</option>
              </Select>
            </FormControl>
            <Button mt={4} colorScheme="teal" type="submit">
              Update
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditTodo;
