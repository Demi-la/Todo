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
} from '@chakra-ui/react';

const AddTodo = ({ isOpen, onClose, addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

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

  console.log('isOpen:', isOpen);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Todo</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
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
          </form>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddTodo
