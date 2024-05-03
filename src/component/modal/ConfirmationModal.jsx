import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to delete this task?</ModalBody>
        <ModalFooter gap={'2rem'}>
          <Button colorScheme="red" onClick={onConfirm}>
            Yes, Delete
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
